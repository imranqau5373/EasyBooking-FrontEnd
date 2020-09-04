import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PagedListingComponentBase, StatusModelDto } from '@shared/service/page-listing-component-base';
import { UserListModelPagged } from '@core/model/users-model/UsersListModelPagged';
import { PagingModel } from '@core/model/common/paging.model';
import { SpeekioToastService } from '@shared/service/speekio-toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/service/user-service';
import { CustomRouter } from '@shared/service/custom-router.service';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GetUserRoleModel, AddUserModel } from '@core/model/users-model/add-users.model';
import { UserListFilterModel, GetUserModel, UserListModel } from '@core/model/users-model/get-usersList.model';
import { CommonService } from '@shared/service/common.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent extends PagedListingComponentBase<UserListModelPagged> implements OnInit {

    paggingModel: PagingModel = new PagingModel();
    usersList: UserListModelPagged = new UserListModelPagged();
    roles: GetUserRoleModel[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    public filter: UserListFilterModel = new UserListFilterModel();
    userList: UserListModel[];
    @ViewChild('btnCloseUserPopup', null) btnCloseUserPopup: ElementRef;
    @ViewChild('btnCloseEditUserPopup', null) btnCloseEditUserPopup: ElementRef;
    @ViewChild('btnCloseUserDeletionPopup', null) btnCloseUserDeletionPopup: ElementRef;
    constructor(
      private usersService: UsersService,
      private toastService: SpeekioToastService,
      public activatedRoute: ActivatedRoute,
      public router: Router,
      private speekioToastService: SpeekioToastService,
      private customRouter: CustomRouter,
      private commonServie: CommonService,
    ) {
      super();
    }
    dropdownSettings = {};
    userModel: AddUserModel;
    ngOnInit() {
      let currentPage = this.customRouter.getQueryParamByKey(this.activatedRoute, 'page');
      if (currentPage) {
        this.paggerConfig.currentPage = currentPage;
      }
      this.dropdownSettings = this.commonServie.getCommonMultiSelectSettings();
      this.userModel = new AddUserModel();
      this.roles = [];
      this.userList = [];
      this.getUserRoles();
      super.ngOnInit();
    }

    getUserRoles() {
      this.usersService.getUserRoles().subscribe(result => {
        let response = result.body;
        if (!response || !response.successful) {
          this.speekioToastService.showError(response.message);
        }
        this.roles = response.userRolesList;
        this.roles.forEach(item => {
          this.filter.Roles.options.push(new StatusModelDto(item.id, item.name));
        });
  
        console.log(this.roles);
        console.log(result);
  
      });
    }


    saveUser(form: any) {
      this.usersService.addNewUser(this.userModel).subscribe(result => {
        let response = result.body;
        if (!response || !response.successful) {
          this.speekioToastService.showError(response.message);
          return;
        }
        console.log(result);
        this.speekioToastService.showSuccess(response.message);
        if (this.userModel.userId && this.userModel.userId > 0)
          this.btnCloseEditUserPopup.nativeElement.click();
        else
          this.btnCloseUserPopup.nativeElement.click();
        form.resetForm();
        this.refresh();
      });
    }
  

    pageChange(newPage: number) {
      if (newPage) {
        this.paggerConfig.currentPage = newPage;
        this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'users-list', { page: newPage });
         this.refresh();
      }
    }
  
    changePageSize(pageSize: number) {
      this.paggerConfig.itemsPerPage = pageSize;
      this.customRouter.navigateToSibling(this.router, this.activatedRoute, 'users-list', { itemsPerPage: pageSize });
       this.refresh();
    }
    protected list(
      request: PagingModel,
      finishedCallback: Function
    ) {
      let model = new GetUserModel();
      model.name = this.filter.Name.value;
      model.email = this.filter.Email.value;
      model.cell = this.filter.Cell.value;
      model.roleIds = this.filter.Roles ? this.filter.Roles.options.filter(t => t.checked == true).map(item => item.id) : null;
      model.statusIds = this.filter.Statuses ? this.filter.Statuses.options.filter(t => t.checked == true).map(item => item.id) : null;
      model.sortColumn = this.sorting;
      model.sortDirection = this.sortDirection ? 'ASC' : 'DESC';
      model.pageNumber = request.currentPage;
      model.pageSize = request.itemsPerPage;
      this.getUserList(model);
    }
    getUserList(filterModel: GetUserModel) {
      this.usersService.getUserList(filterModel).subscribe(result => {
        let response = result.body;
        this.paggerConfig.totalItems = result.body.totalCount;
        if (!response || !response.successful) {
          this.speekioToastService.showError(response.message);
        }
        this.userList = response.userList;
        this.userList.forEach(item => {
          if (item.roles.length > 0) {
            item.roleNames = item.roles.map(r => r.name).join(", ");
          }
        });
  
      });
    }


    ngOnDestroy() {
      this.destroy$.next(true);
      // Unsubscribe from the subject
      this.destroy$.unsubscribe();
    
    }
    loadUserDetail(user : any){
      
    }
  }
