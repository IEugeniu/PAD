using Common;
using Newtonsoft.Json;
using System;
using System.Text;

namespace Transmitter
{
     class Program
     {
          static void Main(string[] args)
          {
               Console.WriteLine("Publisher");

               var subscriber = new Publisher();
               subscriber.Connect(Settings.BROKER_IP, Settings.BROKER_PORT);

               if (subscriber.IsConnected)
               {
                    while (true)
                    {
                         var payload = new Payload();

                         Console.Write("Enter the topic: ");
                         payload.Topic = Console.ReadLine().ToLower();

                         Console.Write("Enter the message: ");
                         payload.Message = Console.ReadLine();

                         var payloadString = JsonConvert.SerializeObject(payload);
                         byte[] data = Encoding.UTF8.GetBytes(payloadString);

                         subscriber.Send(data);
                    }
               }

               Console.ReadLine();
          }
     }
}
