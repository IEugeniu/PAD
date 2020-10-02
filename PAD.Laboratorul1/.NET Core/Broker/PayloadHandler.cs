using Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Broker
{
     class PayloadHandler
     {
          public static void Handle(byte[] payloadBytes, ConnectionInfo connectionInfo)
          {
               var payloadString = Encoding.UTF8.GetString(payloadBytes);
               try
               {
                    payloadString = payloadString.Substring(payloadString.IndexOf('{'));
               }
               catch
               {

               }
               Payload payload = JsonConvert.DeserializeObject<Payload>(payloadString);
               
               if(payload != null)
               {
                    if (payload.type == "subscriber")
                    {
                         connectionInfo.Topic = payload.topic;
                         ConnectionsStorage.Add(connectionInfo);
                    }
                    else
                    {
                         PayloadStorage.Add(payload);
                    }
               }
          }
     }
}
