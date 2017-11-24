using Agenda.API.Helpers;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public User Owner { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Obs { get; set; }
        public Boolean Fav { get; set; }

        //GET CONTACTS
        public static List<Contact> GetContact(int? userId)
        {
            string x = userId == null ? "" : "where u.id = @UserId";
            var query = $@"SELECT
                                c.id as Id,
                                c.name as Name,
                                c.email as Email,
                                c.phone as Phone,
                                c.address as Address,
                                c.obs as Obs,
                                c.fav as Fav
                            FROM contacts c 
                            INNER JOIN users u ON (c.owner_id = u.id)
                            {x}
                            ";

            using (var conn = DbProvider.GetSqlConnection())
            {
                try
                {
                    var data = conn.Query<Contact>(query, new { UserId = userId }).ToList();
                    if (data != null)
                        return data;
                    else
                        throw new Exception("No data returned.");
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
        //SET CONTACTS
        public static Boolean SetContact(int owner, string name, string email, string phone, string address, string obs, Boolean fav)
        {
            if (owner == null || string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(phone))
            {
                return false;
            }

            var query = @"INSERT INTO contacts (owner_id, name, email, phone, address, obs, fav)
                          VALUES (@Owner_Id, @Name, @Email, @Phone, @Address, @Obs, @Fav)
                          ";

            using (var conn = DbProvider.GetSqlConnection())
            {
                try
                {
                    var data = conn.Execute(query, new { Owner_Id = owner, Name = name, Email = email, Phone = phone, Address = address, Obs = obs, Fav = fav });
                    if (data != 0)
                        return true;
                    else
                        return false;
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
        //UPDATE CONTACTS
        public static Boolean UpdateContact(int contactId, string name, string email, string phone, string address, string obs, Boolean fav)
        {
            if (contactId == null)
            {
                return false;
            }

            string x = name == null ? "" : "name = @Name,";
            x += email == null ? "" : "email = @Email,";
            x += phone == null ? "" : "phone = @Phone,";
            x += address == null ? "" : "address = @Address,";
            x += obs == null ? "" : "obs = @Obs,";
            x += fav == null ? "" : "fav = @Fav,";

            x = x.Remove(x.Length - 1);

            var query = $@"UPDATE contacts
                            SET {x}
                            WHERE id = @ContactId
                         ";
            using (var conn = DbProvider.GetSqlConnection())
            {
                try
                {
                    var data = conn.Execute(query, new { ContactId = contactId, Name = name, Email = email, Phone = phone, Address = address, Obs = obs , Fav = fav});
                    if (data != 0)
                        return true;
                    else
                        return false;
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
        //DELETE CONTACTS
        public static Boolean DeleteContact(int contactId)
        {
            if(contactId == null)
            {
                return false;
            }

            var query = @"DELETE FROM contacts
                        WHERE id = @ContactId 
                        ";

            using(var conn = DbProvider.GetSqlConnection())
            {
                try
                {
                    var data = conn.Execute(query, new { ContactId = contactId });
                    if (data != 0)
                        return true;
                    else
                        return false;
                }
                catch(Exception e)
                {
                    throw e;
                }
            }
        }
    }

}
