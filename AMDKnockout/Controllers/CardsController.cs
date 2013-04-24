using System.IO;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace AMDKnockout.Controllers
{
    public class CardsController : Controller
    {
        public object Index()
        {
            var se = new JsonSerializer();
            var sr = new StreamReader(Server.MapPath("/Data/Cards.json"));
            var reader = new JsonTextReader(sr);
            var cards = se.Deserialize(reader);

            return cards;
        }
    }
}