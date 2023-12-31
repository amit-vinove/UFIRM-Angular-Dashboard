import { Component, OnInit , ViewEncapsulation, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { colors } from 'app/colors.const';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates
} from 'ng-apexcharts';

// interface ChartOptions
export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}
export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}

@Component({
  selector: 'app-facility-manager',
  templateUrl: './facility-manager.component.html',
  styleUrls: ['./facility-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacilityManagerComponent implements OnInit {
  
  @ViewChild('apexBarChartRef') apexBarChartRef: any;
  @ViewChild('apexDonutChartRef') apexDonutChartRef: any;
  @ViewChild('apexColumnChartRef') apexColumnChartRef: any;

  public apexBarChart: Partial<ChartOptions>;
  public apexDonutChart: Partial<ChartOptions2>;
  public apexColumnChart: Partial<ChartOptions>;

  // Public
  public data: any;
  public currentUser: any;
  public loading = false;
  public users: User[] = [];
  public rows;
  public ColumnMode = ColumnMode;
  public pagesize: number = 10;
  public pageNumber: number = 1;
  public selectedOption = 10;

  public selectProperty: any = [];
  public selectCategory: any = [];
  public selectSubCategory: any = [];
  public selectTaskStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Completed', value: 'Completed' },
    { name: 'Actionable', value: 'Actionable' }
  ];
  public selectRepeatFrequency: any = [
    { name: 'All', value: '' },
    { name: 'Daily', value: 'D' },
    { name: 'Weekly', value: 'W' },
    { name: 'Monthly', value:'M' },
    { name: 'Yearly', value: 'Y' }
  ];
  public selectTaskPriority: any = [];


  public selectedProperty:any = [];
  public selectedCategory:any = [];
  public selectedSubCategory:any = [];
  public selectedRepeatFrequency:any = [];
  public selectedTaskStatus:any = [];
  public selectedTaskPriority:any = [];
  public selectedDateFrom:NgbDateStruct
  public selectedDateTo: NgbDateStruct

  public employeetaskSummaryData=[]
  public employeeDesignationData=[]
  public employeeAttendanceSummaryData=[]
  public employeeTaskSummaryChartData=[]

  public facilityMembers:any=''
  public guards:any=''
  public vendors:any=0

    // Color Variables
    chartColors = {
      column: {
        series1: '#826af9',
        series2: '#d2b0ff',
        series3: '#a4f8cd',
        bg: '#f8d3ff'
      },
      success: {
        shade_100: '#7eefc7',
        shade_200: '#06774f'
      },
      donut: {
        series1: '#ffe700',
        series2: '#00d4bd',
        series3: '#826bf8',
        series4: '#2b9bf4',
        series5: '#FFA1A1'
      },
      area: {
        series3: '#a4f8cd',
        series2: '#60f2ca',
        series1: '#2bdac7'
      }
    };
    // Private
    private $primary = '#7367F0';
    private $warning = '#FF9F43';
    private $info = '#00cfe8';
    private $info_light = '#1edec5';
    private $strok_color = '#b9c3cd';
    private $label_color = '#e7eef7';
    private $white = '#fff';
    private $textHeadingColor = '#5e5873';
  

  public isFilterActive:boolean=false

    /**
     * Constructor
     *
     * @param {UserService} _userService
     * @param {DashboardService} _dashboardService
     * @param {CoreConfigService} _coreConfigService
   * @param {NgbModal} modalService
     * 
     *
     */
  constructor(    private _userService: UserService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal) { 
    }

    ngOnInit(): void {
      // get the currentUser details from localStorage
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
      /**
       * Get the secure api service (based on user role) (Admin Only secure API)
       * For example purpose
       */
      this.loading = true;
      this._userService
        .getAll()
        .pipe(first())
        .subscribe(users => {
          this.loading = false;
          this.users = users;
        });
  
      // Get the dashboard service data
      this.getAllProperties()
      this.getAllCategories()
      this.getAllTaskPriorities()
      this.getAllFacilityMembers()
      this.getAllGuardsList()
    }

    filterData(){
      if(this.selectedProperty.length ===0){
        Swal.fire('Please select any Property', '', 'error');
      } 
      else{
        this.getEmployeeDesignationCount()
        this.getEmployeeAttendanceSummary()
        this.getEmployeeTaskSummary()
        this.getAllTaskWiseSummary()
        this.isFilterActive = true
      }
    }
    resetData(){
      this.selectedProperty = []
      this.selectedCategory=[]
      this.selectedSubCategory=[]
      this.selectedRepeatFrequency = []
      this.selectedTaskStatus=[]
      this.selectedTaskPriority = []
      this.assignDefaultDate()
      // this.getAllCategoryWiseTasks()
      // this.getCategoryWiseTaskSummary()
      // this.getTaskWiseSummary()
      // this.getAllTaskWiseSummary()
      this.isFilterActive = false
    }

    getAllProperties(){
      this._dashboardService.getAllProperties().subscribe(response => {
        if(this.currentUser.email === 'piyush.gnw@gmail.com'){
          this.selectProperty = response.filter(property => property.PropertyId === 4);
        }
        else if(this.currentUser.email === 'aao.rgr@gmail.com'){
          this.selectProperty = response.filter(property => property.PropertyId === 26);
        }
        else{
          this.selectProperty = response.filter(property => property.PropertyId === 4 || property.PropertyId === 14 || property.PropertyId===26);
        }
      });
      this.assignDefaultDate()
    }

    assignDefaultDate(){
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      this.selectedDateFrom={year,month,day:1}
      this.selectedDateTo = { year, month, day: day };
    }

    getAllCategories(){
      this._dashboardService.getAllCategories().subscribe(response => {
        this.selectCategory = response
      });
    }

    getAllTaskPriorities(){
      this._dashboardService.getAllTaskPriorities().subscribe(response => {
        this.selectTaskPriority = response
      });
    }

    getAllFacilityMembers(){
      let propertyId = 0
      if(this.currentUser.email === 'piyush.gnw@gmail.com'){
        propertyId = 4
      }
      else if(this.currentUser.email === 'aao.rgr@gmail.com'){
       propertyId = 26
      }
      else{
        propertyId = 0
      }  
      this._dashboardService.getAllFacilityMembers(propertyId).subscribe(response=>{
        this.facilityMembers = response.length
      })
    }

    getAllGuardsList(){
      this._dashboardService.getGuardsList().subscribe(response=>{
        this.guards = response.length
      })
    }

    // modal Open Vertically Centered
    modalOpenVC(modalVC) {
      this.modalService.open(modalVC, {
        centered: true,
        size:'lg'
      });
    }

  
    categorySelection(category:any){
      this._dashboardService.getSubCategoriesByCategoryId(category.catId).subscribe(response => {
        this.selectSubCategory=response
      });
    }

    getAllTaskWiseSummary(){
      let payload={
        propId : this.selectedProperty?.PropertyId ? this.selectedProperty?.PropertyId :0 ,
        categoryId:this.selectedCategory?.catId ? this.selectedCategory?.catId : 0,
        subCategoryId:this.selectedSubCategory?.SubCategoryId ? this.selectedSubCategory?.SubCategoryId : 0,
        occurance : this.selectedRepeatFrequency?.value ? this.selectedRepeatFrequency?.value : '',
        status : this.selectedTaskStatus?.value ? this.selectedTaskStatus?.value : '',
        priorityId : this.selectedTaskPriority?.Id ? this.selectedTaskPriority?.Id : 0,
        dateFrom : this.selectedDateFrom ? `${this.selectedDateFrom?.year}-${this.selectedDateFrom?.month}-${this.selectedDateFrom?.day}`:'',
        dateTo : this.selectedDateTo ? `${this.selectedDateTo?.year}-${this.selectedDateTo?.month}-${this.selectedDateTo?.day}`:''
      }
      this.employeetaskSummaryData=[]
      this._dashboardService.getAllEmployeeWiseTaskSummary(payload).subscribe(res=>{
        this.employeetaskSummaryData = res
      })
    }
    // taskName , Date, assigned TO, weekly,

    getEmployeeDesignationCount(){
      let payload={
        propId : this.selectedProperty?.PropertyId ? this.selectedProperty?.PropertyId :0 ,
        categoryId:this.selectedCategory?.catId ? this.selectedCategory?.catId : 0,
        subCategoryId:this.selectedSubCategory?.SubCategoryId ? this.selectedSubCategory?.SubCategoryId : 0,
        occurance : this.selectedRepeatFrequency?.value ? this.selectedRepeatFrequency?.value : '',
        status : this.selectedTaskStatus?.value ? this.selectedTaskStatus?.value : '',
        priorityId : this.selectedTaskPriority?.Id ? this.selectedTaskPriority?.Id : 0,
        dateFrom : this.selectedDateFrom ? `${this.selectedDateFrom?.year}-${this.selectedDateFrom?.month}-${this.selectedDateFrom?.day}`:'',
        dateTo : this.selectedDateTo ? `${this.selectedDateTo?.year}-${this.selectedDateTo?.month}-${this.selectedDateTo?.day}`:''
      }
      this._dashboardService.getEmployeeDesignationCount(payload).subscribe(res=>{
        this.employeeDesignationData = res
        this.initializeDesignationCountChartOptions(this.employeeDesignationData)
      })
    }

    getEmployeeAttendanceSummary(){
      let payload={
        propId : this.selectedProperty?.PropertyId ? this.selectedProperty?.PropertyId :0 ,
        categoryId:this.selectedCategory?.catId ? this.selectedCategory?.catId : 0,
        subCategoryId:this.selectedSubCategory?.SubCategoryId ? this.selectedSubCategory?.SubCategoryId : 0,
        occurance : this.selectedRepeatFrequency?.value ? this.selectedRepeatFrequency?.value : '',
        status : this.selectedTaskStatus?.value ? this.selectedTaskStatus?.value : '',
        priorityId : this.selectedTaskPriority?.Id ? this.selectedTaskPriority?.Id : 0,
        dateFrom : this.selectedDateFrom ? `${this.selectedDateFrom?.year}-${this.selectedDateFrom?.month}-${this.selectedDateFrom?.day}`:'',
        dateTo : this.selectedDateTo  ? `${this.selectedDateTo?.year}-${this.selectedDateTo?.month}-${this.selectedDateTo?.day}`:''
      }
      this._dashboardService.getAllEmployeeAttendanceSummary(payload).subscribe(res=>{
        this.employeeAttendanceSummaryData = res
        this.initializeEmployeeAttendanceSummary(this.employeeAttendanceSummaryData)
      })
    }
    getEmployeeTaskSummary(){
      let payload={
        // propId : this.selectedProperty?.PropertyId ? this.selectedProperty?.PropertyId :0 ,
        propId : this.selectedProperty?.PropertyId ? this.selectedProperty?.PropertyId :4 ,
        categoryId:this.selectedCategory?.catId ? this.selectedCategory?.catId : 0,
        subCategoryId:this.selectedSubCategory?.SubCategoryId ? this.selectedSubCategory?.SubCategoryId : 0,
        occurance : this.selectedRepeatFrequency?.value ? this.selectedRepeatFrequency?.value : '',
        status : this.selectedTaskStatus?.value ? this.selectedTaskStatus?.value : '',
        priorityId : this.selectedTaskPriority?.Id ? this.selectedTaskPriority?.Id : 0,
        dateFrom : this.selectedDateFrom ? `${this.selectedDateFrom?.year}-${this.selectedDateFrom?.month}-${this.selectedDateFrom?.day}`:'',
        dateTo : this.selectedDateTo  ? `${this.selectedDateTo?.year}-${this.selectedDateTo?.month}-${this.selectedDateTo?.day}`:''
      }
      this._dashboardService.getAllEmployeeWiseTaskSummaryChartData(payload).subscribe(res=>{
        this.employeeTaskSummaryChartData = res
        this.initializeEmployeeTaskSummaryChart(this.employeeTaskSummaryChartData)
      })
    }

    onChangePageSize() {
      this.getAllTaskWiseSummary();
    }
  
    getDesignation(){
      let designations=[]
      this.employeeDesignationData.forEach((ele)=>{
        designations.push(ele.Designation)
      })
      return designations
    }
    getDesignationCount(){
      let designations=[]
      this.employeeDesignationData.forEach((ele)=>{
        designations.push(ele.Count)
      })
      return designations
    }
    getAttendanceType(){
      let attendanceType=[]
      this.employeeAttendanceSummaryData.forEach((ele)=>{
        attendanceType.push(ele.Leave)
      })
      return attendanceType
    }
    getAttendanceSummaryData(){
      let attendanceSummary=[]
      this.employeeAttendanceSummaryData.forEach((ele)=>{
        attendanceSummary.push(ele.Count)
      })
      return attendanceSummary
    }

    getTaskSummaryCategory(){
      let taskCategory=[]
      this.employeeTaskSummaryChartData.forEach((ele)=>{
        taskCategory.push(ele.CreatedOn.split('T')[0])
      })
      return taskCategory
    }

    getTaskSummaryCategoryData(){
      let totalTaskObj={name:'Total Tasks',data:[]}
      let completedTaskObj={name:'Completed Tasks',data:[]}
      let actionTaskObj={name:'Action Item',data:[]}
      this.employeeTaskSummaryChartData.forEach((ele)=>{
        totalTaskObj.data.push(ele.TotalTasks)
        completedTaskObj.data.push(ele.CompletedTasks)
        actionTaskObj.data.push(ele.ActionItem)
      })
      let employeeTaskSummaryCategoryData= [totalTaskObj,completedTaskObj,actionTaskObj]
      return employeeTaskSummaryCategoryData
    }

    initializeDesignationCountChartOptions(data:any){
      this.apexBarChart = {
        series: [
          {
            data: this.employeeDesignationData && this.getDesignationCount()
          }
        ],
        chart: {
          height: 400,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '30%',
          }
        },
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          }
        },
        colors: [colors.solid.info],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.employeeDesignationData && this.getDesignation()
        }
      };
    }

    initializeEmployeeAttendanceSummary(data:any){
      this.apexDonutChart = {
        series: this.getAttendanceSummaryData(),
        chart: {
          height: 350,
          type: 'donut'
        },
        colors: [
          this.chartColors.donut.series3,
          this.chartColors.donut.series2,
        ],
        // plotOptions: {
        //   pie: {
        //     donut: {
        //       labels: {
        //         show: true,
        //         name: {
        //           fontSize: '2rem',
        //           fontFamily: 'Montserrat'
        //         },
        //         value: {
        //           fontSize: '1rem',
        //           fontFamily: 'Montserrat',
        //           formatter: function (val) {
        //             return parseInt(val) + '%';
        //           }
        //         },
        //         total: {
        //           show: true,
        //           fontSize: '1.5rem',
        //           label: 'Operational',
        //           formatter: function (w) {
        //             return '31%';
        //           }
        //         }
        //       }
        //     }
        //   }
        // },
        legend: {
          show: true,
          position: 'bottom'
        },
        labels: this.getAttendanceType(),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      };

    }

    initializeEmployeeTaskSummaryChart(data:any){
      this.apexColumnChart = {
        series: this.getTaskSummaryCategoryData(),
        chart: {
          type: 'bar',
          height: 400,
          stacked: true,
          toolbar: {
            show: false
          }
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left'
        },
        plotOptions: {
          bar: {
            columnWidth: '15%',
            colors: {
              backgroundBarColors: [
                this.chartColors.column.bg,
                this.chartColors.column.bg,
                this.chartColors.column.bg,
                this.chartColors.column.bg,
                this.chartColors.column.bg
              ],
            }
          }
        },
        colors: [this.chartColors.column.series1, this.chartColors.column.series2,this.chartColors.column.series3],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.getTaskSummaryCategory()
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands';
            }
          }
        }
      };
    }

    /**
     * After View Init
     */
    ngAfterViewInit() {
      // Subscribe to core config changes
      this._coreConfigService.getConfig().subscribe(config => {
        // If Menu Collapsed Changes
        if (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) {
          setTimeout(() => {
            // Get Dynamic Width for Charts
            // this.isMenuToggled = false;
          }, 1000);
        }
      });
    }

}
