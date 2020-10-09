using Broker.Models;
using Broker.Services.Interfaces;
using Google.Protobuf;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Broker.Services
{
     public class MessageStorageService : IMessageStoregeService
     {
          private static string PayloadFilePath = @"D:\University\Anul IV\Pad\PAD.Laboratorul1\gRPC\MessagesQueueStorage.txt";
          private readonly ConcurrentQueue<Message> _messages;

          public MessageStorageService()
          {
               string JsonMessagesString = File.ReadAllText(PayloadFilePath);

               if (String.IsNullOrEmpty(JsonMessagesString))
               {
                    _messages = new ConcurrentQueue<Message>();
               }
               else
               {
                    _messages = JsonConvert.DeserializeObject<ConcurrentQueue<Message>>(JsonMessagesString);
               }
          }



          public void Add(Message message)
          {
               _messages.Enqueue(message);

               File.WriteAllText(PayloadFilePath, JsonConvert.SerializeObject(_messages));
          }

          public Message GetNext()
          {
               Message message;
               _messages.TryDequeue(out message);

               File.WriteAllText(PayloadFilePath, JsonConvert.SerializeObject(_messages));

               return message;
          }

          public string CheckNextTopic()
          {
               Message payload = null;
               _messages.TryPeek(out payload);

               if (payload != null)
                    return payload.Topic;
               else
                    return null;
          }

          public bool IsEmpty()
          {
               return _messages.IsEmpty;
          }
     }
}
