using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Broker
{
     class PostWorker
     {
          private const int TIME_TO_SLEEP = 1000;
          public void DoSendTopicWork()
          {
               while(true)
               {
                    while(!PayloadStorage.IsEmpty() && ConnectionsStorage.ExistConnections())
                    {
                         var payload = PayloadStorage.GetNext();

                         if(payload != null)
                         {
                              var connections = ConnectionsStorage.GetConnectionsByTopic(payload.topic);

                              foreach (var connection in connections)
                              {
                                   var payloadString = JsonConvert.SerializeObject(payload);
                                   byte[] data = Encoding.UTF8.GetBytes(payloadString);
                                   Console.WriteLine(payloadString);
                                   connection.Socket.Send(data);
                              }
                         }
                    }
                    Thread.Sleep(TIME_TO_SLEEP);
               }
          }
     }
}
