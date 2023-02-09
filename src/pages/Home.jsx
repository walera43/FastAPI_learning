const Home = () => {
    return (
    <>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>HomePage</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"/>
    </head>
    <body>
    <main role="main" className="container">
      <div className="box" style={{margin: "70px"}}>
        <div className="card-body">                    
          <div className="card-text">
            <p><h6>Привет!</h6> Еще во время обучения в университете изучал языки программирования 
                (C#, C++), сделал небольшой проект на движке Unity, моему приложению даже получилось немного повисеть в Google Play. 
                А потом моё детище было удалено из-за необновленной декларации по пользовательскому соглашению. 
                После получения диплома и встречи с реальностью поиска работы, бесконечных отказов, 
                мое влечение к программированию улетело далеко на пыльный шкаф. 
                Стал обычным офисным клерком и постепенно копил обиду, тратил нервы и думал, что делать дальше. 
                В какой-то момент начал интересоваться VR/AR снова завлекла тропа технологий. 
                Все еще хотелось встать на путь IT-индустрии и получить какой-то прикладной навык. Кресты забыты, а шарп округлился. 
                Так я и начал постепенно изучать синтаксис языка Python по книжкам, просиживать на CodeWars, а после получил диплом о  профессиональной переподготовки по "Python". 
                Теперь я где-то тут. Вот моя ссылка на <a href="https://github.com/walera43">GIT</a>, а тут на <a href="https://www.codewars.com/users/Walera47">CodeWars</a>.
                Так что! Добро пожаловать.</p>
          </div>                    
        </div>                
      </div>   
  </main>
    </body>
    </>
    );
}

export default Home