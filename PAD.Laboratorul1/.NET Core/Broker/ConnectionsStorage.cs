using Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text.Json;

namespace Broker
{
     static class ConnectionsStorage
     {
          private static string path = @"D:\University\Anul IV\Pad\PAD.Laboratorul1\Connections.txt";
          private static List<ConnectionInfo> _connections;
          private static object _locker;

          static ConnectionsStorage()
          {
               _connections = new List<ConnectionInfo>();
               _locker = new object();
          }

          public static void Add(ConnectionInfo connection)
          {
               lock (_locker)
               {
                    _connections.Add(connection);

                    //Serialize(_connections, path);
               }
          }

          public static void Remove(string address)
          {
               lock(_locker)
               {
                    _connections.RemoveAll(x => x.Address == address);
               }
          }

          public static List<ConnectionInfo> GetConnectionsByTopic(string topic)
          {
               List<ConnectionInfo> selectedConnections;
               lock(_locker)
               {
                    selectedConnections = _connections.Where(x => x.Topic == topic).ToList();
               }

               return selectedConnections;
          }

          public static bool ExistConnections()
          {
               return _connections.Any();
          }

          public static void Serialize(List<ConnectionInfo> list, string filePath)
          {
               using (Stream stream = File.OpenWrite(filePath))
               {
                    var formatter = new BinaryFormatter();
                    formatter.Serialize(stream, list);
               }
          }

          public static List<ConnectionInfo> Deserialize(string filePath)
          {
               using (Stream stream = File.OpenRead(filePath))
               {
                    try
                    {
                         var formatter = new BinaryFormatter();
                         return (List<ConnectionInfo>)formatter.Deserialize(stream);
                    }
                    catch
                    {
                         return _connections = new List<ConnectionInfo>();
                    }
               }
          }
     }
}
