using System.IO;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace AMDKnockout.Controllers
{
    public class SavingsCalculatorController : Controller
    {
        public object CalculateBalanceTransferSavingAmounts()
        {
            var se = new JsonSerializer();
            var sr = new StreamReader(Server.MapPath("~/Data/BalanceTransferSavings.json"));
            var reader = new JsonTextReader(sr);
            var savings = se.Deserialize(reader);

            return savings;
        }

        public object CalculatePurchaseSavingAmounts()
        {
            var se = new JsonSerializer();
            var sr = new StreamReader(Server.MapPath("~/Data/PurchaseSavings.json"));
            var reader = new JsonTextReader(sr);
            var savings = se.Deserialize(reader);

            return savings;
        }

        public object CalculateCashbackSavingAmounts()
        {
            var se = new JsonSerializer();
            var sr = new StreamReader(Server.MapPath("~/Data/CashbackSavings.json"));
            var reader = new JsonTextReader(sr);
            var savings = se.Deserialize(reader);

            return savings;
        }

        public object CalculateRewardsSavingAmounts()
        {
            var se = new JsonSerializer();
            var sr = new StreamReader(Server.MapPath("~/Data/RewardsSavings.json"));
            var reader = new JsonTextReader(sr);
            var savings = se.Deserialize(reader);

            return savings;
        }
    }
}