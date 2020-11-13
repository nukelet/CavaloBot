const { prefix } = require('../config.json');
module.exports =
{
    name: 'touhou',
    description: `Fetches a random Touhou Series fanart from Safebooru. Usage: ${prefix}touhou`,

    execute(message)
    {
        const axios = require('axios').default;
        const convert = require('xml-js');

        const SafebooruApiUrl = 'https://safebooru.org/index.php?page=dapi&s=post&q=index';

        // since there are as of 13/11/2020 13k pages for the
        // 'touhou' tag
        const pageNumber = Math.floor(Math.random() * 13000);
        const searchLimit = 40;
        const searchOptions = {
            params: {
                // since there are 40 images per page
                limit: searchLimit,
                tags: 'touhou',
                pid: pageNumber,
            },
        };

        axios.get(SafebooruApiUrl, searchOptions)
            .then(response => {
                let data = convert.xml2js(response.data, { ignoreComment: true, alwaysChildren: true, alwaysArray: true });

                // picks a random image in the page
                const imageIndex = Math.floor(Math.random() * searchLimit);
                data = data.elements[0].elements[imageIndex];

                const url = data.attributes.sample_url;

                message.channel.send(`${url}`);

                // for downloading the random image

                // const request = require('request');
                // const fs = require('fs');

                // const download = (url, path, callback) => {
                //     request.head(url, (err, res, body) => {
                //         request(url)
                //             .pipe(fs.createWriteStream(path))
                //             .on('close', callback);
                //     });
                // };

                // const fileName = data.attributes.id;
                // const path = `./tmp/touhou/${fileName}`;

                // download(url, path, () => console.log('Download successful.'));
            })
            .catch(err => console.log(err));
            },
};
