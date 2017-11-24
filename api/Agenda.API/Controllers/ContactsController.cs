using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Agenda.API.Models;

namespace Agenda.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        [HttpGet("{userId?}")]
        public IActionResult Get(int? userId = null)
        {
            var data = Contact.GetContact(userId); // lista de usuarios retornado do banco

            return Ok(data);
        }

        [HttpPost("insert")]
        public IActionResult Set([FromBody] dynamic data)
        {
            if (data.id == null)
            {
                return BadRequest("Invalid data");
            }

            int owner = data.id;
            string name = data.name;
            string email = data.email;
            string phone = data.phone;
            string address = data.address;
            string obs = data.obs;
            Boolean fav = data.fav;

            if(string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(phone))
            {
                return BadRequest("Invalid data");
            }

            var result = Contact.SetContact(owner, name, email, phone, address, obs, fav);

            if (!result) return BadRequest("Invalid Data");

            return Ok(result);
        }

        [HttpPut("update")]
        public IActionResult Update([FromBody] dynamic data)
        {
            if(data.id == null)
            {
                return BadRequest("Your contact need an Id");
            }

            int id = data.id;
            string name = data.name;
            string email = data.email;
            string phone = data.phone;
            string address = data.address;
            string obs = data.obs;
            Boolean fav = data.fav;

            if (string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(email) && string.IsNullOrWhiteSpace(phone) && string.IsNullOrWhiteSpace(address) && string.IsNullOrWhiteSpace(obs) && fav == null)
            {
                return BadRequest("All the data cannot be null");
            }

            var result = Contact.UpdateContact(id, name, email, phone, address, obs, fav);

            if (!result) return BadRequest("Invalid data");

            return Ok(result);
        }

        [HttpDelete("delete")]
        public IActionResult Delete([FromBody] dynamic data)
        {
            if(data.id == null)
            {
                return BadRequest("You need an Id");
            }
            int id = data.id;

            var result = Contact.DeleteContact(id);

            if (!result) return BadRequest("Invalid data");

            return Ok(result);
        }
    }
}