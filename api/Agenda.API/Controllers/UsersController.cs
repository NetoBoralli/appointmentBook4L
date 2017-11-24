using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agenda.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] dynamic data)
        {
            string username = data.username;
            string password = data.password;

            if(string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Invalid data");
            }

            var user = Models.User.GetUser(username, password);

            if (user == null) return BadRequest("User or password incorrect");

            return Ok(user);
        }

        [HttpPost("singup")]
        public IActionResult SingUp([FromBody] dynamic data)
        {
            string username = data.username;
            string password = data.password;

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Invalid data");
            }

            var user = Models.User.SetUser(username, password);

            if (user == -1) return BadRequest("User already exists");
            else if (user == 0) return BadRequest("Invalid data");

            return Ok(user);
        }
    }
}