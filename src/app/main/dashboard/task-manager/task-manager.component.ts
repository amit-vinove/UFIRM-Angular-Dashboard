import { Component, OnInit , ViewEncapsulation, ViewChild} from '@angular/core';
import { first } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

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
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagerComponent implements OnInit {
  
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
    { name: 'Daily', value: 'Daily' },
    { name: 'Weekly', value: 'Weekly' },
    { name: 'Monthly', value:'Monthly' },
    { name: 'Yearly', value: 'Yearly' }
  ];
  public selectTaskPriority: any = [];


  public selectedProperty = [];
  public selectedCategory = [];
  public selectedSubCategory = [];
  public selectedRepeatFrequency = [];
  public selectedTaskStatus = [];
  public selectedTaskPriority = [];
  public selectedDateFrom = [];
  public selectedDateTo = [];

  public taskSummaryData=[]

  public categoryWiseData=[]
  
  public categoryWiseTaskSummaryData=[]
  public taskWiseSummaryData=[]

  public dailyTasks:any=''
  public weeklyTasks:any=''
  public overdueTasks:any=19

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
  
    /**
     * Constructor
     *
     * @param {UserService} _userService
     * @param {DashboardService} _dashboardService
     * @param {CoreConfigService} _coreConfigService
     *
     */
  constructor(    private _userService: UserService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService) { 
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
      this.getDailyTaskDetails()
      this.getWeeklyTaskDetails()
      this.getAllTaskWiseSummary()
      this.getAllCategoryWiseTasks()
      this.getCategoryWiseTaskSummary()
      this.getTaskWiseSummary()
    }

    filterData(){

    }

    getAllProperties(){
      this._dashboardService.getAllProperties().subscribe(response => {
        this.selectProperty = response
      });
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

    getDailyTaskDetails(){
      this._dashboardService.getDailyTaskDetails().subscribe(response=>{
        this.dailyTasks = response.length
      })
    }

    getWeeklyTaskDetails(){
      this._dashboardService.getWeeklyTaskDetails().subscribe(response=>{
        this.weeklyTasks = response.length
      })
    }
  
    categorySelection(category:any){
      this._dashboardService.getSubCategoriesByCategoryId(category.catId).subscribe(response => {
        this.selectSubCategory=response
      });
    }

    getAllTaskWiseSummary(){
      this._dashboardService.getAllTaskWiseSummary().subscribe(res=>{
        this.taskSummaryData = res
      })
    }

    getAllCategoryWiseTasks(){
      this._dashboardService.getAllCategoryWiseTasks(4).subscribe(res=>{
        this.categoryWiseData = res
        this.initializeCategoryWiseTaskOptions(this.categoryWiseData)
      })
    }

    getCategoryWiseTaskSummary(){
      this._dashboardService.getAllCategoryWiseTaskSummaryChart().subscribe(res=>{
        this.categoryWiseTaskSummaryData = res
        this.initializeCategoryWiseTaskSummary(this.categoryWiseData)
      })
    }
    getTaskWiseSummary(){
      this._dashboardService.getAllTaskWiseSummaryChart().subscribe(res=>{
        console.log(res)
        this.taskWiseSummaryData = res
        this.initializeTaskSummary(this.taskWiseSummaryData)
      })
    }

    onChangePageSize() {
      this.getAllTaskWiseSummary();
    }
  
    getCategories(){
      let categories=[]
      this.categoryWiseData.forEach((ele)=>{
        categories.push(ele.Category)
      })
      return categories
    }
    getCategoryTaskCount(){
      let categories=[]
      this.categoryWiseData.forEach((ele)=>{
        categories.push(ele.Count)
      })
      return categories
    }

    getCategorySummaryData(){
      let categorySummary=[]
      categorySummary[0] = this.categoryWiseTaskSummaryData[0].ActionableTasks
      categorySummary[1] = this.categoryWiseTaskSummaryData[0].CompletedTasks
      categorySummary[2] = this.categoryWiseTaskSummaryData[0].OverdueTasks
      categorySummary[3] = this.categoryWiseTaskSummaryData[0].TotalTasks
      return categorySummary
    }

    getTaskSummaryCategory(){
      let taskCategory=[]
      this.taskWiseSummaryData.forEach((ele)=>{
        taskCategory.push(ele.CategoryName)
      })
      return taskCategory
    }

    getTaskSummaryCategoryData(){
      let totalTaskObj={name:'Total Tasks',data:[]}
      let completedTaskObj={name:'Completed Tasks',data:[]}
      let actionTaskObj={name:'Action Item',data:[]}
      this.taskWiseSummaryData.forEach((ele)=>{
        totalTaskObj.data.push(ele.TotalTasks)
        completedTaskObj.data.push(ele.CompletedTasks)
        actionTaskObj.data.push(ele.ActionItem)
      })
      let taskSummaryCategoryData= [totalTaskObj,completedTaskObj,actionTaskObj]
      return taskSummaryCategoryData
    }

    initializeCategoryWiseTaskOptions(data:any){
      this.apexBarChart = {
        series: [
          {
            data: this.categoryWiseData && this.getCategoryTaskCount()
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
          categories: this.categoryWiseData && this.getCategories()
        }
      };
    }

    initializeCategoryWiseTaskSummary(data:any){
      this.apexDonutChart = {
        series: this.getCategorySummaryData(),
        chart: {
          height: 350,
          type: 'donut'
        },
        colors: [
          this.chartColors.donut.series1,
          this.chartColors.donut.series2,
          this.chartColors.donut.series3,
          this.chartColors.donut.series5
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
        labels: ['Actionable Tasks', 'Completed Tasks', 'Overdue Tasks', 'Total Tasks'],
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

    initializeTaskSummary(data:any){
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
