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

  getParams(payload:any){
    let params = new HttpParams();

    const parameterKeys = [
      'propId',
      'categoryId',
      'subCategoryId',
      'occurance',
      'status',
      'priorityId',
      'dateFrom',
      'dateTo'
    ];
    parameterKeys.forEach(key => {
      if (payload[key]) {
        params = params.append(key, payload[key]);
      }
    });
    return params
  }


  /**
   * Get Api Data
   */

  //Task Manager API
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
  getTaskWiseStatusCount(payload):Observable<any>{
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseStatusFinalCountDash`,{params});
  }
  getAllTaskWiseSummary(payload:any): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummary`,{params});
  }
  getAllCategoryWiseTasks(payload:any): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTasks`,{params},
    );
  }
  getAllCategoryWiseTaskSummaryChart(payload): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(
      `${environment.apiUrl}/GetAllCategoryWiseTaskSummaryChart`,{params},
    );
  }
  getAllTaskWiseSummaryChart(payload): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseSummaryChart`,{params});
  }
  getAllTaskWiseStatus(payload):Observable<any>{
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllTaskWiseStatusFinalDash`,{params});
  }
  getAllTaskPriorityCount(payload){
    const params = this.getParams(payload)
    return this._httpClient.get(
      `${environment.apiUrl}/GetTaskPriorityCountDash`,{params},
    );
  }

  //Facility Members API
  getAllFacilityMembers(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GetAllFacilityMembers`);
  }
  getGuardsList(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/GuardList`);
  }
  getEmployeeDesignationCount(payload:any): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(
      `${environment.apiUrl}/EmployeeDesignationCount`,{params}
    );
  }
  getAllEmployeeAttendanceSummary(payload): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/EmployeeAttendanceSummaryCount`,{params});
  }
  getAllEmployeeWiseTaskSummaryChartData(payload): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllEmployeeWiseTaskSummaryChartData`,{params});
  }
  getAllEmployeeWiseTaskSummary(payload): Observable<any> {
    const params = this.getParams(payload)
    return this._httpClient.get(`${environment.apiUrl}/GetAllEmployeeWiseTaskSummary`,{params});
  }

}
