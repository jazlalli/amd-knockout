using System.IO;
using System.Text;
using AMDKnockout.Models;

namespace AMDKnockout.Helpers
{
    public static class DataRepository
    {
        public static ResponseData GetData(StreamReader reader)
        {
            var sb = new StringBuilder();
            
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                sb.AppendLine(line);
            }

            return new ResponseData
                {
                    Data = sb.ToString()
                };
        }
    }
}