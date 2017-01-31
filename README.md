# wavelength

This is an electron app wrapped around ffmpeg. I wanted something so I could quickly convert audio formats, so I wrote this lightwieght UI around ffmpeg.

## Development Steps

    $ npm install
    $ npm run start
    $ npm run electron

Keep the start process running while you run electron. At this point changes do not cause electron to reload, but it's something I'd like to implement.

## Build Steps

    $ npm install
    $ npm run build
    $ npm run asar

This will output your a native binary for your system under `dist/out/<operating system name>/`.

**Target Colour Scheme:** [http://paletton.com/#uid=74H0u0kllllaFw0g0qFqFg0w0aF](http://paletton.com/#uid=74H0u0kllllaFw0g0qFqFg0w0aF)