    var animation_data = {
      "title": "Качотта",
      "path" : "/img/svg/animations/caciotta/",
      "steps" : [{
        "img": "packing.svg",
        "header": "",
        "description": ""
        },
        {
        "img": "transportation.svg",
        "header": "Транспортировка",
        "description": "Доставка молока специализированной автомолцистерной с фермы на завод."
        },
        {
        "img": "quality_control.svg",
        "header": "Контроль качества",
        "description": "Экспертиза молока в собственной высокотехнологичной лаборатории."
        },
        {
        "img": "milk_inspection.svg",
        "header": "ПРИЁМКА МОЛОКА",
        "description": "Количественный учет и проверка соответствия молока требованиям, установленным стандартами качества «Лосево»."
        },
        {
        "img": "milk_aging.svg",
        "header": "СОЗРЕВАНИЕ МОЛОКА",
        "description": "Процесс созревания молока, необходимого для производства сыра."
        },
        {
        "img": "pasteurization.svg",
        "header": "ПАСТЕРИЗАЦИЯ",
        "description": "Процесс одноразового мгновенного нагревания молока до 95° С с целью обеззараживания."
        },
        {
        "img": "leavening.svg",
        "header": "ЗАКВАШИВАНИЕ",
        "description": "Внесение в молоко закваски, состоящей из определенных видов микроорганизмов, при требуемых температурах, а также сычужного фермента."
        },
        {
        "img": "souring.svg",
        "header": "СКВАШИВАНИЕ",
        "description": "Образование сырного колье (сгустка)."
        },
        {
        "img": "cheese_mass.svg",
        "header": "СЫРНАЯ МАССА",
        "description": "Проверка свойств полученного сырного сгустка."
        },
        {
        "img": "forming.svg",
        "header": "ФОРМОВКА И ПРЕССОВАНИЕ СЫРНОЙ МАССЫ",
        "description": "Распределение сырного колье по формам, прессование продукта и формирование сырных головок."
        },
        {
        "img": "brining.svg",
        "header": "ПРОСОЛКА СЫРНЫХ ГОЛОВОК",
        "description": ""
        },
        {
        "img": "cheese_aging.svg",
        "header": "СЫРНАЯ КАМЕРА, СОЗРЕВАНИЕ",
        "description": "Процесс созревание сырных голов."
        },
        {
        "img": "packing.svg",
        "header": "ФАСОВКА",
        "description": "Фасовка и упаковка сыра в оригинальную упаковку «Лосево»"
        },
        {
        "img": "logistics.svg",
        "header": "ДОСТАВКА НА ПРИЛАВОК",
        "description": "Логистика готовой продукции в торговые точки «Лосево»."
        }
      ]
    };
    var current_anim = 0;

    var canvas = Snap("#animation-canvas");
    var paper = canvas.g(), box;
    var temp;
    var appearTime = 1500, disappearTime = 200;
    var appearMatrix = new Snap.Matrix(),
      zeroscaleMatrix = new Snap.Matrix();
    canvas.append(paper);

    function stepAnimation(){
      var element = paper.select("svg");
      box = element.getBBox();
      switch (current_anim % animation_data.steps.length){
        case 1:
          var car = element.select("#car");
          var carMatrix = new Snap.Matrix();
          carMatrix.translate(box.w+100,0);
          car.animate({transform: carMatrix}, appearTime, mina.linear, function(){
            car.transform(carMatrix.translate(-box.w-100,0));
          });
          break;
        default: console.log("defualt case in step animation");
      }
    }

    function onLoadSVG(data){
      paper.attr({
        opacity: 0
      });
      paper.append(data);
      box = canvas.getBBox();
      appearMatrix = new Snap.Matrix();
 
      zeroscaleMatrix.scale(0,0,box.cx,box.cy);
      appearMatrix.scale(0.8,0.8,box.cx,box.cy);
      paper.transform(zeroscaleMatrix);
      paper.attr({
        opacity: 1
      });
      paper.animate({transform: appearMatrix}, appearTime, mina.elastic,stepAnimation);
    }
    function startNextAnim(){
      paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          paper.remove();
          paper = canvas.g();
          Snap.load(animation_data.path + animation_data.steps[++current_anim % animation_data.steps.length].img, onLoadSVG);
          $("#lsv-production__description-header").text(animation_data.steps[current_anim % animation_data.steps.length].header);
          $("#lsv-production__description").text(animation_data.steps[current_anim % animation_data.steps.length].description);
      });
    }
    Snap.load(animation_data.path + animation_data.steps[current_anim].img, onLoadSVG);
    // $("#lsv-production__description-header").text(animation_data.steps[current_anim].header);
    // $("#lsv-production__description").text(animation_data.steps[current_anim].description);
    $("#lsv-dairy-products__next-animation").click(startNextAnim);