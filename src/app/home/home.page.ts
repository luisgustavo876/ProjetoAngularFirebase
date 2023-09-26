import { Component, NgModule, ViewChild } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NavController, ModalController } from '@ionic/angular';
import { create } from 'domain';


/////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

// variaveis /////////////////////////////////////////////////////////////////////////////////////

  funcionario:any;
  searchTerm!:string;
  guia:any = 'all';
  isLoading: boolean = false;
  funcionarios: any;
  codigo:any;
  

// constructor ////////////////////////////////////////////////////////////////////////////////////

  constructor(
    public modalCtrl: ModalController  
) { 
    this.listarfuncionario()
}


// MODAL //////////////////////////////////////////////////////////////////////////////////////////


isModalOpen = false;

  setOpen(funcionario: any) {
    this.isModalOpen = true;
    console.log(funcionario)
    this.funcionario = funcionario
  }
  closeModal() {
    this.isModalOpen = false;
  }



// Funçoes ////////////////////////////////////////////////////////////////////////////////////////  

expandSearchBar() {
  // Define a largura da barra de pesquisa quando ela é clicada.
  const searchBar = document.querySelector('.search-bar') as HTMLElement;
  searchBar.style.width = '100%';
}

resetSearchBar() {
  // Redefine a largura da barra de pesquisa quando ela perde o foco.
  const searchBar = document.querySelector('.search-bar') as HTMLElement;
  searchBar.style.width = '30%';
}

  listarfuncionario(){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response.funcionarios;
      // ['Nome']['cargo']['cidade']['fone']
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }


  setCodFun(codigo:any) {
    console.log(this.codigo)
    this.codigo = codigo;
  }
  removerfuncionario(codigo:any){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({CodFun: codigo})
			}//
		)
    .then(response => response.json())
    .then(response => { 
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  atualizarFuncionario(){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/atualizar_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: this.funcionarios, Acao: 'atualizar'})
			}
		)
    .then(response => response.json())
    .then(response => { 
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  Inserirfuncionario(){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/inserir_funcionario.php')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response.funcionarios;
      // ['Nome']['cargo']['cidade']['fone']
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  

// ion-segmente evento de troca ///////////////////////////////////////////////////////////////////  

  trocar(event:any){
    console.log(event.detail.value)
    this.guia=event.detail.value
  }

// alert remover //////////////////////////////////////////////////////////////////////////////////

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'alert-button-cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Confirm',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.removerfuncionario(this.codigo)
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}