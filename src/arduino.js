        const { SerialPort } = require('serialport');
        const { ReadlineParser } = require('@serialport/parser-readline');

        const barrelPort = new SerialPort({ path: 'COM5', baudRate: 9600 }); 
        const cannonPort = new SerialPort({ path: 'COM4', baudRate: 9600 });
        const barrelParser = barrelPort.pipe(new ReadlineParser({ delimiter: '\n' }));
        const cannonParser = cannonPort.pipe(new ReadlineParser({ delimiter: '\n' }));


        barrelPort.on('open', () => console.log('Barrel port open'));
        cannonPort.on('open', () => console.log('Cannon port open'));

        barrelParser.on('data', data => {
          console.log('Barrel output:', data);
        });

        cannonParser.on('data', data => {
          console.log('Cannon output:', data);
        });

        barrelPort.on('error', err => console.error('Barrel port error:', err.message));
        cannonPort.on('error', err => console.error('Cannon port error:', err.message));

