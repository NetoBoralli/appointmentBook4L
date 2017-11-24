using Agenda.API.Helpers;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public static User GetUser(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return null;
            }
            var query = @"SELECT
                                u.id as Id,
                                u.username as Username
                            FROM users u
                            WHERE u.username = @Username and u.password = @Password 
                            ";

            using (var conn = DbProvider.GetSqlConnection())
            {
                try
                {
                    var data = conn.Query<User>(query, new { Username = username, Password = password })?.FirstOrDefault();
                    if (data != null)
                        return data;
                    else
                        return null;
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        public static int SetUser(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return 0;
            }

            var query = @"INSERT INTO users (username, password)
                          VALUES (@Username, @Password)
                          SELECT SCOPE_IDENTITY()";

            using (var conn = DbProvider.GetSqlConnection())
            {
                try
                {   

                    var data = conn.ExecuteScalar<int>(query, new { Username = username, Password = password });
                    if (data != 0)
                        return data;
                    else
                        return 0;
                }
                catch (Exception e)
                {
                    if (e.Message.Contains("UNIQUE KEY constraint")) return -1;
                    throw e;
                }
            }
        }

    }
}
