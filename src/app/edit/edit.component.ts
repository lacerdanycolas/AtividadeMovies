import { MovieService } from './../movie/movie.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit{
  
  editForm: FormGroup;

  private _object;
  model: Date;
  private listGenres:[];
  public selectedValueListAll = [];
  public selectedValueOld = [];
  public listAux = [];
  
  
  constructor(private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private router: Router, private _movieService:MovieService,
    private location: Location) { }


    get object(){
      return this._object;
    }

    set object(value){
      this._object = value;
    }

    onChangeAll(genero){
     
      //verifica se genero foi emmitido do removeGenres
      if(genero[1]['data']){
        
        this.listGenres = genero[1].data;
      }
      else if(genero){
        //add o elemento selecionado a lista de todos os generos
        if(genero.value!=undefined){
          this.selectedValueOld.push(genero.value);
          console.log(this.selectedValueOld);
        }
        
      }
      
     
    }

    onChangeOld(generoOld){
     
     //Verifica se genero foi emmitido do addGenres
      if(generoOld[1]['data']){
        this._object['genres'] = generoOld[1].data;
      }
      else if(generoOld){
        //add o elemento selecionado a lista de GenerosSelecionados
        if(generoOld.value!=undefined){
          this.selectedValueOld.push(generoOld.value);
          console.log(this.selectedValueOld);
        }
        
      }
      
    }

    addGenres(){
      
      //Preenchendo listaAux para nao perder referencia do objeto
        this.listAux = this.listGenres;

        var control = 0;
        var x = 0;
          while(control!=this.selectedValueListAll.length && x!=this.listAux.length){ 
            if(this.listAux[x] == this.selectedValueListAll[control]){
              var index = this.listAux.indexOf(this.listAux[x]);
              this.listAux.splice(index,1); 
              control++;
              x=-1;    
           }
           x++;
          }
          
      //Montando a lista de generos a ser adicionada na lista já existente
      if(this.selectedValueListAll.length >= 1){
        let gen:[];
        gen = this._object['genres'];
        //add a nova lista os generos pré-definidos
        for(var i=0; i < gen.length;i++){
          if(gen[i]!=undefined){
              this.selectedValueListAll.push(gen[i]);
          }
        }
       
        //Emitimos um evento para mudar a view, e passamos a lista nova;
        this.editForm.get('genresOld').setValue([{
          emitModelToViewChange: true
       },{
         data:this.selectedValueListAll
       }])

      
        }
      }
     

      removeGenres(){
        
        //Preenchendo listaAux para nao perder referencia do que está 
        //armazenado no Objeto
        this.listAux = this._object['genres'];
        
        //verificando se ao menos um genero foi selecionado
        if(this.selectedValueOld.length>=1){


          //Montando nova lista a ser associada ao objeto
          var control = 0;
          var x = 0;
          while(control!=this.selectedValueOld.length && x!=this.listAux.length){
            if(this.listAux[x] == this.selectedValueOld[control]){
              var index = this.listAux.indexOf(this.listAux[x]);
              this.listAux.splice(index,1); 
              control++;
              x=-1;    
           }
           x++;
          }
        

          //montando lista a ser adicionada na lista de todos generos
          for(var i=0; i < this.listGenres.length;i++){
           this.selectedValueOld.push(this.listGenres[i]);
          }

         
         
           //Emitimos um evento para mudar a view, e passamos a lista nova;
            this.editForm.get('genresAll').setValue([{
              emitModelToViewChange: true
          },{
            data:this.selectedValueOld
          }])

           //Emitimos um evento para mudar a view associada ao objeto
            this.editForm.get('genresOld').setValue([{
              emitModelToViewChange: true
          },{
            data:this.listAux
          }])

          
          
          }

        
       
      }

      previousUrl(){
         this.location.back();
        }

      onSubmit(){
        alert("Salvando");
      }

   splitArray(conjMenor:[],conjMaior:[]){
      
      var i = 0;
      var j = 0;
      var newConj = conjMaior;
      while(conjMenor.length!=i){
        if(conjMenor[i]['name'] == conjMaior[j]['name']){
          var index = conjMaior.indexOf(conjMaior[j]);
          newConj.splice(index,1);
          i++;
          j=-1;     
      }
      j++
      if(conjMenor.length==i){
        return newConj;
      }

      }
     

   }

  ngOnInit() {

    this._movieService.getGenres().subscribe(
      response => {
        this.listGenres = response['genres'];
        console.log(this.listGenres);
      }
    )  

    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];

      this._movieService.getById(id)
        .subscribe(response => {
          this._object = response;
           
        })
       
    });

    this.editForm = this.formBuilder.group({
      sinopse: ['', Validators.required],
      titulo: ['', Validators.required],
      dataLancamento: ['', Validators.required],
      genresAll: ['',Validators.required],
      genresOld:['', Validators.required]
    });

    

  }

  ngAfterViewInit(): void {
  this.listGenres = this.splitArray(this._object['genres'],this.listGenres);
  console.log(this.listGenres);
 
 
  
  }

}
