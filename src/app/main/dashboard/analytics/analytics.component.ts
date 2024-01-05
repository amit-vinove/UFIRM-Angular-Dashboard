import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { first } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';

import { colors } from 'app/colors.const';
import { User } from 'app/auth/models';
import { UserService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {
  // Decorator
  @ViewChild('gainedChartRef') gainedChartRef: any;
  @ViewChild('orderChartRef') orderChartRef: any;
  @ViewChild('avgSessionChartRef') avgSessionChartRef: any;
  @ViewChild('supportChartRef') supportChartRef: any;
  @ViewChild('salesChartRef') salesChartRef: any;

  // Public
  public data: any;
  public currentUser: any;
  public loading = false;
  public users: User[] = [];
  public gainedChartoptions;
  public orderChartoptions;
  public avgsessionChartoptions;
  public supportChartoptions;
  public salesChartoptions;
  public isMenuToggled = true;

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

  public dailyTasks:any=''
  public weeklyTasks:any=''
  public monthlyTasks:any=''

  public facilityMembers:any=''
  public guardsList:any=0
  public vendors:any=12

  public supervisors:any=8
  public trainers:any=5
  public managers:any=12

  public employeeDesignationCount=[]

  public searchValue = '';
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public rows;
  private tempData = [];

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
  constructor(
    private _userService: UserService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService
  ) {
    // Subscribers Gained chart
    this.gainedChartoptions = {
      chart: {
        height: 100,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      colors: [this.$primary],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100]
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Order Received Chart
    this.orderChartoptions = {
      chart: {
        height: 100,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      colors: [this.$warning],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100]
        }
      },
      series: [
        {
          name: 'Orders',
          data: [10, 15, 8, 15, 7, 12, 8]
        }
      ],
      tooltip: {
        x: { show: false }
      }
    };

    // Average Session Chart
    this.avgsessionChartoptions = {
      chart: {
        type: 'bar',
        height: 200,
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      colors: [
        this.$label_color,
        this.$label_color,
        this.$primary,
        this.$label_color,
        this.$label_color,
        this.$label_color
      ],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          endingShape: 'rounded'
        }
      },
      tooltip: {
        x: { show: false }
      }
    };

    // Support Tracker Chart
    this.supportChartoptions = {
      chart: {
        height: 290,
        type: 'radialBar',
        sparkline: {
          enabled: false
        }
      },
      plotOptions: {
        radialBar: {
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: this.$white,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              color: this.$textHeadingColor,
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              color: this.$textHeadingColor,
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [colors.solid.danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.solid.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['Completed Tickets']
    };

    // Sales Chart
    this.salesChartoptions = {
      chart: {
        height: 330,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 0
      },
      colors: [this.$primary, this.$info],
      plotOptions: {
        radar: {
          polygons: {
            connectorColors: 'transparent'
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#9f8ed7', this.$info_light],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      dataLabels: {
        style: {
          colors: [
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color,
            this.$strok_color
          ]
        }
      },
      yaxis: {
        show: false
      }
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
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

       let payload={}

    // Get the dashboard service data
    // this._dashboardService.getAllProperties().subscribe(response => {
    //   this.selectProperty = response
    // });
    this._dashboardService.getAllCategories().subscribe(response => {
      this.selectCategory = response
    });
    this._dashboardService.getAllTaskPriorities().subscribe(response => {
      this.selectTaskPriority = response
    });
    this.getFacilityMemberCount()
    this.getTaskCountDetails()
    this._dashboardService.getGuardsList().subscribe(response=>{
      this.guardsList = response.length
    })
    this._dashboardService.getEmployeeDesignationCount(4).subscribe(response=>{
      this.employeeDesignationCount = response
    })
  }

  getFacilityMemberCount(){
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

  getTaskCountDetails(){
    let date = new Date()
    const todayDate = date.toISOString().slice(0, 10);
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
    this._dashboardService.getTaskCountDetails(propertyId).subscribe(response=>{
      this.dailyTasks = response[0].Daily,
      this.weeklyTasks = response[0].Weekly,
      this.monthlyTasks = response[0].Monthly
    })
  }


  getDailyTasks(){
    let date = new Date()
    const todayDate = date.toISOString().slice(0, 10);
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
    this._dashboardService.getDailyTaskDetails(propertyId,todayDate).subscribe(response=>{
      this.dailyTasks = response.length
    })
  }
  getweeklyTasks(){
    let date = new Date()
    const todayDate = date.toISOString().slice(0, 10);
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
    this._dashboardService.getWeeklyTaskDetails(propertyId,todayDate).subscribe(response=>{
      this.weeklyTasks = response.length
    })
  }

  getMonthlyTasks(){
    let date = new Date()
    const todayDate = date.toISOString().slice(0, 10);
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
    this._dashboardService.getMonthlyTaskDetails(propertyId,todayDate).subscribe(response=>{
      this.monthlyTasks = response.length
    })
  }

  categorySelection(category:any){
    this._dashboardService.getSubCategoriesByCategoryId(category.catId).subscribe(response => {
      this.selectSubCategory=response
    });
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
          this.isMenuToggled = false;
          this.gainedChartoptions.chart.width = this.gainedChartRef?.nativeElement.offsetWidth;
          this.orderChartoptions.chart.width = this.orderChartRef?.nativeElement.offsetWidth;
          this.avgsessionChartoptions.chart.width = this.avgSessionChartRef?.nativeElement.offsetWidth;
          this.supportChartoptions.chart.width = this.supportChartRef?.nativeElement.offsetWidth;
          this.salesChartoptions.chart.width = this.salesChartRef?.nativeElement.offsetWidth;
        }, 1000);
      }
    });
  }
}
