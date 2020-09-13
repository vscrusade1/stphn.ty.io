const xmlHttp = new XMLHttpRequest();
const library = {};

let stIGAccessToken = "IGQVJWYkFlV1VMZAXVLTGViMDEtT1duZAjRnRjM5MkJLbDZAwZADZAIeVA2bm5rWDA4cnYzVjVKR2xTYWJMSTdjZAlpNbEpoN0lQSXpNdXBKTUdNWkhjWjRvd2lrSm4yQlFyYVlWUVBHU0hrd185TjI0SEJITndVcGlMX3NYVlFF";
let stAccountMediaId = "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + stIGAccessToken;

library.httpGetMediaId = function (url) {
    let arr = [];
    let obj = {};
    try {
        let objMediaIds = library.httpGet(url);
        /*        console.log("httpGetMediaId objMediaIds:", objMediaIds);*/
        for (let i in objMediaIds) {
            for (let x in objMediaIds[i]) {
                if (objMediaIds[i][x].id) {
                    /*  console.log(" objMediaIds[i][x]",  objMediaIds[i][x]);*/
                    obj.id = objMediaIds[i][x].id
                    arr.push(obj.id );
                }
            }
        }

    }
    catch (e) {
        console.log("errror:",e);
    }
    /*    console.log("httpGetMediaId:", arr);*/
    return arr;
}

library.httpGetMediaImageUrl = function (url) {
    console.log("httpGetMediaImageUrl url", url);
    let arr = [];
    let obj = {};
    let objMediaIds = library.httpGetMediaId(url);
    /*    console.log("httpGetMediaImageUrl obj:", objMediaIds);*/
    for(var i in objMediaIds){
        console.log("httpGetMediaImageUrl objMediaIds:",objMediaIds[i] );
        obj.ImageUrl = "https://graph.instagram.com/" +objMediaIds[i]
            + "?fields=id,media_type,media_url,username,timestamp&access_token="+stAccountMediaId;
        arr.push(obj.ImageUrl);
    }
    console.log("arr", arr);
    return arr;
}

library.httpGet = function (theUrl) {
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

library.Table = function (url) {
    let htmlString = "";
    let rowString = "";
    let count = 0;
    console.log("url", url);
    let objUrl = library.httpGetMediaImageUrl(url);
    for(let i in objUrl){
        rowString += '<div class="col-sm">\n';
        rowString += '<img class="card-img-top" src="' + objUrl[i] + '">\n';
        rowString += '</div>\n';

        /*        console.log("count", count);*/
        if(count == 3) {
            /*         console.log("ara naku sa count", count);*/
            htmlString += '<div class="row">\n';
            htmlString += rowString;
            htmlString += '</div>\n';
            htmlString += ' <br>\n';
            htmlString += ' <br>\n';
            rowString = "";
            count = 0 ;
        }
        count++;
        /*    console.log("count", count);*/
    }
    /*    var str = document.getElementById("ig").innerHTML;
        var res = str.replace("{imageTable}", htmlString);
        document.getElementById("ig").innerHTML = res;*/
    return htmlString ;
}

