using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        [Authorize]
        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            return "Ok";
        }
     
        [HttpGet]
        [Route("GetDataNot")]
        public string GetDataNot()
        {
            return "Ok Not ";
        }
    }
}
