# ScalesSerial2http

To mount hardware into docker:
1. Set udev Rule
    !On host machine!
    create a file 
    - for com serial
        /etc/udev/rules.d/99-serial.rules
        with text
            KERNEL=="ttyS[0-9]*",MODE="0666"
    - for usb serial
        /etc/udev/rules.d/99-serial-usb.rules
            KERNEL=="ttyUSB[0-9]*",MODE="0666"
    reboot host machine

!!!ALREADY DONE!!!

2. Mount /dev Folder From Host to Container
    in docker-compose.yml 
    volumes:
      - /dev:/dev
3. Run Container in Privileged Mode
    in docker-compose.yml
    privileged: true