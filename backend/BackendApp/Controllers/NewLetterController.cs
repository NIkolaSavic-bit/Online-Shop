using BackendApp.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using Org.BouncyCastle.Ocsp;

namespace BackendApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewLetterController : ControllerBase
    {
        [HttpPost("subscribe")]
        public IActionResult Subscribe([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
                return BadRequest(new { message = "Potreban je e-mail" });

            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("SHOOPPER", "shoopperteam@gmail.com"));
                /*MailboxAddress predstavlja jednog primaoca.
                Parse metoda uzima string email adrese i pretvara ga u MailboxAddress objekat.
                request.Email dolazi iz backend modela:*/
                message.To.Add(MailboxAddress.Parse(request.Email));
                message.Subject = "Hvala Vam";
                message.Body = new TextPart("html")
                {
                    Text = @"
                  <h1>Hvala što ste se prijavili!</h1>
                  <p>Kao nagradu dobijate <strong>10% popusta</strong> na prvu kupovinu.</p>
                  <a href='https://www.pinterest.com/'>Posetite našu prodavnicu</a>
                  <img src='https://shop.com/logo.png' alt='Logo' width='100'/>"
                };

                using var client = new SmtpClient();

                /*Klijent pokušava da se poveže na server smtp.gmail.com preko porta 465.
                Ako je true, veza odmah koristi SSL/TLS.
                Nakon uspešne konekcije, možeš pozvati Authenticate da se prijaviš sa Gmail nalogom i šalješ email.*/
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate("shoopperteam@gmail.com", "alfa olbs klqu ixyl");
                client.Send(message);
                //zatvara vezu sa SMTP
                client.Disconnect(true);

                return Ok(new { message = "Email je uspesno poslat" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Nije moguce poslati mail", error = ex.Message });

            }
        }
    }
}