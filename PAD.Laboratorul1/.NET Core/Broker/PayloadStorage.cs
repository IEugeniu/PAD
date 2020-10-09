
using Common;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.IO;

namespace Broker
{
     static class PayloadStorage
     {
          private static string PayloadFilePath = @"D:\University\Anul IV\Pad\PAD.Laboratorul1\.NET Core\PayloadQueueStorage.txt";
          private static ConcurrentQueue<Payload> _payloadsQueue;
          static PayloadStorage()
          {
               string JsonPayloadsString = File.ReadAllText(PayloadFilePath);

               if (String.IsNullOrEmpty( JsonPayloadsString))
               {
                    _payloadsQueue = new ConcurrentQueue<Payload>();
               }
               else
               {
                    _payloadsQueue = JsonConvert.DeserializeObject<ConcurrentQueue<Payload>>(JsonPayloadsString);
               }
          }

          public static void Add(Payload payload)
          {
               _payloadsQueue.Enqueue(payload);
               File.WriteAllText(PayloadFilePath, JsonConvert.SerializeObject(_payloadsQueue));
          }

          public static Payload GetNext()
          {
               Payload payload = null;
               _payloadsQueue.TryDequeue(out payload);

               File.WriteAllText(PayloadFilePath, JsonConvert.SerializeObject(_payloadsQueue));

               return payload;
          }

          public static string CheckNextTopic()
          {
               Payload payload = null;
               _payloadsQueue.TryPeek(out payload);

               if (payload != null)
                    return payload.topic;
               else
                    return null;
          }

          public static bool IsEmpty()
          {
               return _payloadsQueue.IsEmpty;
          }
     }
}
