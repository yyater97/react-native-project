let rootURL = 'https://api.themoviedb.org/3/search/movie?api_key=751317cfe4fa2e7948560b4fb888277f';

export default function API(text){
    
    let url = `${rootURL}&query=${text}`;
    if(text=='')
        url = `${rootURL}&query=marvel`;
    return fetch(url).then(function(response){
        return response.text();
    }).then(function(text){
        let data =  JSON.parse(text);
        console.log(data);
        return{
            flatData: data.results,
        };
    });
}