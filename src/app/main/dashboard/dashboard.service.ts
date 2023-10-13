import { HttpClient } from '@angular/common/http';
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
  getAllTaskWiseSummary(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummary`);
  }
  getAllCategoryWiseTasks(propId: number): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTasks?propId=${propId}`,
    );
  }
  getAllCategoryWiseTaskSummaryChart(): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTaskSummaryChart`,
    );
  }

  getAllTaskWiseSummaryChart(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummaryChart`);
  }

}
