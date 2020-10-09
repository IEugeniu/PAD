package utm.pad.lab1;
import static utm.pad.lab1.PublisherConfig.IP;
import static utm.pad.lab1.PublisherConfig.PORT;
public class Publisher {
    public static void main(String[]args) {
        PublisherSocket publisherSocket = new PublisherSocket();
        publisherSocket.connect(IP, PORT);
        publisherSocket.send();
        publisherSocket.close();
    }
}