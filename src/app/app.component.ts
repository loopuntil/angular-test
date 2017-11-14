import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Hero} from './hero';
import {AppService} from './app.service'
import {ConfirmationService} from 'primeng/primeng'

@Component({
    selector: 'app-root',
    providers: [AppService,ConfirmationService],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private service: AppService, private confirmationService: ConfirmationService) {
    }

    heroList: Hero[];
    heroId: string='';
    heroName: string='';
    loading: boolean;
    display: boolean = false;
    message: string='';

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.setTable();
    }

    add() {
        if (this.checkValueFailed()){
            this.showDialog();
            return;
        }       
        this.service.add({id: this.heroId, name: this.heroName}).then(sucess => {
            this.heroId = '';
            this.heroName = '';
            this.setTable();
        });
    }
    showDialog(){
        this.display = true;
    }
    checkValueFailed(): boolean{
        this.message='';
        if (this.heroId.trim()===''){
            this.message +='ID not entered! ';
        }
        if (this.heroName.trim()===''){
            this.message +='NAME not entered! ';
        }
        if (this.message){
            return true;
        }
        return false;
    }
    setTable() {
        this.loading = true;
        this.service.getHeroList()
            .then(result => {
                this.heroList = result;
                this.loading = false;
            });
    }
    remove(id: string) {
        this.service.remove(id).then(success => {
            if (!success) {
                alert('Delete Error!');
            }
            this.setTable();
        });
    }

    confirm(id:string) {
        this.confirmationService.confirm({
            message: 'Do you want to remove the hero?',
            accept: () => {
                this.remove(id);
            }
        });
    }
}
