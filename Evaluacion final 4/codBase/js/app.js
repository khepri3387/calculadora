var Calculadora = {
  Init: function() {
    this.numero1 = ''
    this.numero2 = ''
    this.inputVals = document.getElementById('display')
    this.resultado = document.getElementsByClassName('resultado')[0]
    this.btnSuma = document.getElementsByClassName('suma')[0]
    this.btnResta = document.getElementsByClassName('resta')[0]
    this.btnMultiplica = document.getElementsByClassName('multiplica')[0]
    this.btnDivide = document.getElementsByClassName('divide')[0]
    this.ejecutar = document.getElementById('igual')
    this.EscucharEventos()
    this.asignarEventos()
  },

  EscucharEventos: function() {
    var self = this,
        accion = '',
        numero1 = '';
    this.btnSuma.addEventListener('click', function(e) {
      accion = 'sumar'
      if (self.inputVals.textContent.length!=0) {
        self.numero1 = Number(self.inputVals.textContent)
      }
      self.inputVals.textContent = ''
      self.inputVals.focus()
      self.RealizarOperacion(self.numero1, accion)
    })
    this.btnResta.addEventListener('click', function(e) {
      accion = 'restar'
      if (self.inputVals.textContent.length!=0) {
        self.numero1 = Number(self.inputVals.textContent)
      }
      self.inputVals.textContent = ''
      self.inputVals.focus()
      self.RealizarOperacion(self.numero1, accion)
    })
    this.btnMultiplica.addEventListener('click', function(e) {
      accion = 'multiplicar'
      if (self.inputVals.textContent.length!=0) {
        self.numero1 = Number(self.inputVals.textContent)
      }
      self.inputVals.textContent = ''
      self.inputVals.focus()
      self.RealizarOperacion(self.numero1, accion)
    })
    this.btnDivide.addEventListener('click', function(e) {
      accion = 'dividir'
      if (self.inputVals.textContent.length!=0) {
        self.numero1 = Number(self.inputVals.textContent)
      }
      self.inputVals.textContent = ''
      self.inputVals.focus()
      self.RealizarOperacion(self.numero1, accion)
    })
  },

  RealizarOperacion: function(numero1, accion) {
    var result = '';
    var self = this
    this.ejecutar.onclick = function(e) {
      e.preventDefault()
      self.numero2 = Number(self.inputVals.textContent)
      switch (accion) {
        case 'sumar':
          result = self.Sumar(self.numero1, self.numero2)
          if (self.checkResultLength(result)) {
            self.inputVals.innerHTML = result;
          }else {
            self.inputVals.innerHTML = result.toString().substring(0,8);
          }
          break;
        case 'restar':
          result = self.Restar(self.numero1, self.numero2)
          if (self.checkResultLength(result)) {
            self.inputVals.innerHTML = result;
          }else {
            self.inputVals.innerHTML = result.toString().substring(0,8);
          }
          break;
        case 'multiplicar':
          result = self.Multiplicar(self.numero1, self.numero2)
          if (self.checkResultLength(result)) {
            self.inputVals.innerHTML = result;
          }else {
            self.inputVals.innerHTML = result.toString().substring(0,8);
          }
          break;
        case 'dividir':
          result = self.Dividir(self.numero1, self.numero2)
          if (self.checkResultLength(result)) {
            self.inputVals.innerHTML = result;
          }else {
            self.inputVals.innerHTML = result.toString().substring(0,8);
          }
          break;
        default:
          break;
      }
    }
  },

  Sumar: function(a, b) {
    return ( a + b )
  },

  Restar: function(a, b) {
    return ( a - b )
  },

  Multiplicar: function(a, b) {
    return ( a * b )
  },

  Dividir: function(a, b) {
    return ( a / b)
  },

  presionarTecla: function(event) {
    event.target.style.transform = "scale(0.9,0.9)";
    console.log(this)
    this.clearNumbers(event);
    this.cambiarSigno(event);
    if ( this.checkPantalla() ) {
      this.displayNumbers(event);
    }
  },

  soltarTecla: function(event) {
    event.target.style.transform = "scale(1,1)";
  },

  asignarEventos: function() {
    var images = document.getElementsByClassName('tecla')
    var self = this
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("mousedown", self.presionarTecla.bind(self));
      images[i].addEventListener("mouseup", self.soltarTecla.bind(self));
    }
  },

  checkCero: function() {
    var pantalla = document.getElementById('display');
    if (pantalla.innerHTML=="0") {
      return true;
    }else return false;
  },

  existePunto: function() {
    var pantalla = document.getElementById('display');
    if (pantalla.innerHTML.indexOf('.')<0) {
      return false;
    } else return true;
  },

  displayNumbers: function(event) {
    var pantalla = document.getElementById('display');
    var teclaPresionda = event.target.id;
    var numeros = ["1","2","3","4","5","6","7","8","9","0","punto"];
    for (var i = 0; i < numeros.length; i++) {
      if (teclaPresionda==numeros[i]) {
        if (teclaPresionda=="punto") {
          if (! this.existePunto()) {
            pantalla.innerHTML = pantalla.innerHTML+".";
            break;
          }else {
            break;
          }
        }else {
          if (! this.checkCero()) {
            pantalla.innerHTML = pantalla.innerHTML+teclaPresionda;
            break;
          }else {
            pantalla.innerHTML = teclaPresionda;
            break;
          }
        }
      }
    }
  },

  checkResultLength: function(result){
    var resultLength = result.length;
    if (resultLength<8) {
      return true;
    }else return false;
  },

  checkPantalla: function() {
    var pantalla = document.getElementById('display');
    var numeroCaracteres = pantalla.innerHTML.length;
    if (numeroCaracteres<8) {
      return true;
    } else return false;
  },

  clearNumbers: function(event) {
    var pantalla = document.getElementById('display');
    var teclaPresionda = event.target.id;
    if (teclaPresionda=="on") {
      pantalla.innerHTML="0";
    }
  },

  cambiarSigno: function(event) {
    var pantalla = document.getElementById('display');
    var teclaPresionda = event.target.id;
    if (teclaPresionda=="sign") {
      if (! this.checkCero()) {
        if (! pantalla.innerHTML.includes('-')) {
          pantalla.innerHTML="-"+pantalla.innerHTML;
        }else {
          pantalla.innerHTML=pantalla.innerHTML.replace('-','');
        }

      }
    }
  }
}
Calculadora.Init()
