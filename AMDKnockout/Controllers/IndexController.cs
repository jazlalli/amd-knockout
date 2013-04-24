using System.IO;
using System.Text;
using System.Web.Mvc;
using AMDKnockout.Models;

namespace AMDKnockout.Controllers
{
    public class IndexController : Controller
    {
        public ActionResult Index()
        {
            var sb = new StringBuilder();
            using (var sr = new StreamReader(Server.MapPath("Data/Cards.json"))) 
            {
                string line;
                while ((line = sr.ReadLine()) != null) 
                {
                    sb.AppendLine(line);
                }
            }

            var response = new ResponseData
                {
                    Data = sb.ToString()
                };

            return View(response);
        }
    }
}