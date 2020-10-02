using Common;
using System;
using System.Threading.Tasks;

namespace Broker
{
     class Program
     {
          static void Main(string[] args)
          {
               Console.WriteLine("Broker");

               BrokerSocket socket = new BrokerSocket();
               socket.Start(Settings.BROKER_IP, Settings.BROKER_PORT);

               var PostWorker = new PostWorker();
               Task.Factory.StartNew(PostWorker.DoSendTopicWork, TaskCreationOptions.LongRunning);

               Console.ReadLine();
          }
     }
}
