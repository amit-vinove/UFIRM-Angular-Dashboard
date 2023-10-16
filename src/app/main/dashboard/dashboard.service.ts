import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  // Public
  public apiData: any;
  public onApiDataChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
  }


  /**
   * Get Api Data
   */
  getAllProperties(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllProperties`);
  }
  getAllCategories(): Observable<any> {
    return this._httpClient.get(`https://admin-api.urest.in/api/Calendar/Category/List/R`);
  }
  getSubCategoriesByCategoryId(categoryId: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetCategory?categoryId=${categoryId}`);
  }
  getAllTaskPriorities(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskPriorities`);
  }
  getDailyTaskDetails(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/TaskDetails?occurrence=D`);
  }
  getWeeklyTaskDetails(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/TaskDetails?occurrence=W`);
  }
  getAllFacilityMembers(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllFacilityMembers`);
  }
  getGuardsList(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GuardList`);
  }
  getEmployeeDesignationCount(propId: number): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}/EmployeeDesignationCount?propId=${propId}`
    );
  }
  getAllEmployeeWiseTaskSummary(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllEmployeeWiseTaskSummary`);
  }
  getAllTaskWiseSummary(payload:any): Observable<any> {
    let params = new HttpParams();

    if(payload.propId) {
      params = params.append('propId', payload.propId);
    }
    if(payload.categoryId) {
      params = params.append('categoryId', payload.categoryId);
    }

    if(payload.subCategoryId) {
      params = params.append('subCategoryId', payload.subCategoryId);
    }

    if(payload.occurance) {
      params = params.append('occurance', payload.occurance);
    }

    if(payload.status) {
      params = params.append('status', payload.status);
    }

    if(payload.priorityId) {
      params = params.append('priorityId', payload.priorityId);
    }

    if(payload.dateFrom) {
      params = params.append('dateFrom', payload.dateFrom);
    }

    if(payload.dateTo) {
      params = params.append('dateTo', payload.dateTo);
    }
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummary`,{params});
  }
  getAllCategoryWiseTasks(payload:any): Observable<any> {
    let params = new HttpParams();

    if(payload.propId) {
      params = params.append('propId', payload.propId);
    }
    if(payload.categoryId) {
      params = params.append('categoryId', payload.categoryId);
    }

    if(payload.subCategoryId) {
      params = params.append('subCategoryId', payload.subCategoryId);
    }

    if(payload.occurance) {
      params = params.append('occurance', payload.occurance);
    }

    if(payload.status) {
      params = params.append('status', payload.status);
    }

    if(payload.priorityId) {
      params = params.append('priorityId', payload.priorityId);
    }

    if(payload.dateFrom) {
      params = params.append('dateFrom', payload.dateFrom);
    }

    if(payload.dateTo) {
      params = params.append('dateTo', payload.dateTo);
    }
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTasks`,{params},
    );
  }
  getAllCategoryWiseTaskSummaryChart(payload): Observable<any> {
    let params = new HttpParams();

    if(payload.propId) {
      params = params.append('propId', payload.propId);
    }
    if(payload.categoryId) {
      params = params.append('categoryId', payload.categoryId);
    }

    if(payload.subCategoryId) {
      params = params.append('subCategoryId', payload.subCategoryId);
    }

    if(payload.occurance) {
      params = params.append('occurance', payload.occurance);
    }

    if(payload.status) {
      params = params.append('status', payload.status);
    }

    if(payload.priorityId) {
      params = params.append('priorityId', payload.priorityId);
    }

    if(payload.dateFrom) {
      params = params.append('dateFrom', payload.dateFrom);
    }

    if(payload.dateTo) {
      params = params.append('dateTo', payload.dateTo);
    }
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTaskSummaryChart`,{params},
    );
  }

  getAllTaskWiseSummaryChart(payload): Observable<any> {
    let params = new HttpParams();

    if(payload.propId) {
      params = params.append('propId', payload.propId);
    }
    if(payload.categoryId) {
      params = params.append('categoryId', payload.categoryId);
    }

    if(payload.subCategoryId) {
      params = params.append('subCategoryId', payload.subCategoryId);
    }

    if(payload.occurance) {
      params = params.append('occurance', payload.occurance);
    }

    if(payload.status) {
      params = params.append('status', payload.status);
    }

    if(payload.priorityId) {
      params = params.append('priorityId', payload.priorityId);
    }

    if(payload.dateFrom) {
      params = params.append('dateFrom', payload.dateFrom);
    }

    if(payload.dateTo) {
      params = params.append('dateTo', payload.dateTo);
    }
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummaryChart`,{params});
  }

}
