import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Selection, easeLinear } from 'd3';

function lineEnter<T extends SVGGeometryElement>(
  line: Selection<T, any, any, any>,
  duration: number
) {
  line
    .attr('stroke-dasharray', () => line.node()!.getTotalLength())
    .attr('stroke-dashoffset', line.node()!.getTotalLength())
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .attr('stroke-dashoffset', 0);
}
function lineLeave<T extends SVGGeometryElement>(
  line: Selection<T, any, any, any>,
  duration: number
) {
  line
    .attr('stroke-dasharray', () => line.node()!.getTotalLength())
    .attr('stroke-dashoffset', 0)
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .attr('stroke-dashoffset', line.node()!.getTotalLength());
}

export const areas: {
  area: string;
  line: string;
  number: number;
  x: number;
  y: number;
  imgSrc?: string;
  videoSrc?: string[];
  title?: string;
  text?: string[];
}[] = [
  {
    area: '生产二区圆铜线',
    line: 'MEB转子',
    number: 19,
    x: 150.5990447998047,
    y: 302.2522277832031,
    imgSrc: '/static/MEB转子/VW_MEB_BASE_转子.jpg',
    videoSrc: [
      '/static/MEB转子/压环工位.mp4',
      '/static/MEB转子/感应加热工位.mp4',
      '/static/MEB转子/机器人区域1.mp4',
      '/static/MEB转子/车外圆工位.mp4',
    ],
  },
  {
    area: '生产二区扁铜线',
    line: 'IEDS转子',
    number: 33,
    x: 282.5018310546875,
    y: 126.58538055419922,
    imgSrc: '/static/9月24日新增/IEDS转子/145KW转子.JPG'
  },
  {
    area: '生产二区圆铜线',
    line: 'MEB定子',
    number: 6,
    x: 173.65423583984375,
    y: 202.48870849609375,
    imgSrc: '/static/MEB定子/VW_MEB_BASE-定子.jpg',
  },
  {
    area: '生产二区圆铜线',
    line: 'MEB电枢线',
    number: 37,
    x: 248.25222778320312,
    y: 259.34681701660156,
  },
  {
    area: '生产二区扁铜线',
    line: '小电轴定子',
    number: 4,
    x: 306.38519287109375,
    y: 173.53599548339844,
    videoSrc: [
      '/static/9月24日新增/小电轴定子/安装导油罩.MOV',
      '/static/9月24日新增/小电轴定子/导油罩翻转.MOV',
    ]
  },
  {
    area: '生产二区扁铜线',
    line: '小电轴电枢',
    number: 43,
    x: 445.3153076171875,
    y: 177.44927978515625,
    videoSrc: [
      '/static/小电轴电枢/切头.mp4',
      '/static/小电轴电枢/成型机.mp4',
      '/static/小电轴电枢/电测试.mp4',
      '/static/小电轴电枢/铜线入铁芯.mp4',
    ],
  },
  {
    area: '生产一区滴漆',
    line: '滴漆（MEB）',
    number: 0,
    x: 498.81072998046875,
    y: 56.31528949737549,
  },
  {
    area: '生产一区滴漆',
    line: '滴漆（小电轴）',
    number: 12,
    x: 701.740966796875,
    y: 110.54387283325195,
  },
  {
    area: '生产一区',
    line: 'EDU电枢',
    number: 23,
    x: 352.5191955566406,
    y: 84.34681701660156,
    imgSrc: '/static/EDU电枢/105KW电枢.jpg',
    videoSrc: [
      '/static/EDU电枢/切头.mp4',
      '/static/EDU电枢/成型机.mp4',
      '/static/EDU电枢/焊接.mp4',
      '/static/EDU电枢/电性能.mp4',
    ],
  },
  {
    area: '生产一区',
    line: 'EV2电枢',
    number: 29,
    x: 569.1654663085938,
    y: 132.6148223876953,
    videoSrc: ['/static/EV2电枢/下线.mp4', '/static/EV2电枢/异形线.mp4'],
  },
  {
    area: '生产一区滴漆',
    line: '滴漆（EV&EDU）',
    number: 8,
    x: 640.7015991210938,
    y: 74.44928169250488,
  },
  {
    area: '生产一区',
    line: 'EDU总装',
    number: 46,
    x: 424.4088439941406,
    y: 129.3546905517578,
    imgSrc: '/static/EDU总装/80KW永磁同步电机.jpg',
  },
  {
    area: '生产一区',
    line: 'EV2总装',
    number: 41,
    x: 499.3941345214844,
    y: 94.59117126464844,
    imgSrc: '/static/EV2总装/52KW永磁同步电机.jpg',
  },
  {
    area: '生产三区',
    line: 'BEV3漆前电枢',
    number: 18,
    x: 940.51239013671875,
    y: 334.3547058105469,
    imgSrc: '/static/BEV3漆前电枢/漆前电枢（BEV3）.jpg',
  },
  {
    area: '生产二区圆铜线',
    line: 'MEB转子二期',
    number: 19,
    x: 84.57540893554688,
    y: 243.37046813964844,
    imgSrc: '/static/9月24日新增/MEB转子二期/BEV3转子.JPG',
    videoSrc: [
      '/static/9月24日新增/MEB转子二期/压环工位.mp4',
      '/static/9月24日新增/MEB转子二期/感应加热工位.mp4',
      '/static/9月24日新增/MEB转子二期/机器人区域1.mp4',
      '/static/9月24日新增/MEB转子二期/车外圆工位.mp4',
    ]
  },
  {
    area: '生产三区',
    line: 'VOLVO总装线',
    number: 25,
    x: 855.4964599609375,
    y: 175.4256591796875,
    imgSrc: '/static/VOLVO总装线/131KW异步电机.jpg',
    videoSrc: [
      '/static/VOLVO总装线/台架测试.mp4',
      '/static/VOLVO总装线/定子上料.mp4',
      '/static/VOLVO总装线/总成下线.mp4',
      '/static/VOLVO总装线/总成热套.mp4',
    ],
    title: '131kW异步电机',
    text: [
      'VOLVO 623A 八层扁铜线电机项目是VOLVO全球项目。产品组成：电机总装包含定子、转子、前后轴承、内外壳体、旋转变压器、滤波板、低压线束、油封等。',
      '产线具备自动上下料、自动转子入定子、自动热套、自动气密及静态性能测试、自动台架测试（NVH、负载、空载）、自动刻字及机械刻字等功能。',
    ]
  },
  {
    area: '生产三区',
    line: 'VOLVO漆后定子线',
    number: 7,
    x: 672.93701171875,
    y: 213.79608154296875,
    imgSrc: '/static/VOLVO漆后定子线/定子（VOLVO).jpg',
    videoSrc: [
      '/static/VOLVO漆后定子线/热套.mp4',
      '/static/VOLVO漆后定子线/热套2.mp4',
    ],
  },
  {
    area: '生产一区滴漆',
    line: '绝缘车间（VOLVO）',
    number: 20,
    x: 758.3389282226562,
    y: 147.46505737304688,
    imgSrc: '/static/绝缘车间（VOLVO）/漆后电枢（VOLVO）.jpg',
    videoSrc: [
      '/static/绝缘车间（VOLVO）/滴漆1.mp4',
      '/static/绝缘车间（VOLVO）/滴漆2.mp4',
    ],
  },
  {
    area: '生产一区滴漆',
    line: 'MEB及小电轴滴漆扩能产线',
    number: 0,
    x: 586.4166870117188,
    y: 180.9143524169922,
  },
  {
    area: '生产二区扁铜线',
    line: 'C轴电枢线',
    number: 27,
    x: 423.2995300292969,
    y: 215.31529235839844,
    imgSrc: '/static/C轴电枢线/C400定子.jpg',
  },
  {
    area: '生产三区',
    line: 'BEV3漆后电枢',
    number: 6,
    x: 610,
    y: 430,
    imgSrc: '/static/BEV3漆后电枢/GM_BEV3_电枢.jpg',
  },
  {
    area: '生产二区扁铜线',
    line: '注塑转子二号线',
    number: 29,
    x: 368.2443542480469,
    y: 392.6778564453125,
  },
  {
    area: '生产三区',
    line: 'VOLVO定子线',
    number: 15,
    x: 787.4492797851562,
    y: 254.0010528564453,
    imgSrc: '/static/VOLVO定子线/漆前电枢（VOLVO).jpg',
    videoSrc: [
      '/static/VOLVO定子线/上料.mp4',
      '/static/VOLVO定子线/铜线入铁芯.mp4',
    ],
  },
];

// const area2 = [
//   { area: '生产二区圆铜线', line: 'MEB转子', number: 19, x: 174, y: 262 },
//   { area: '生产二区扁铜线', line: 'IEDS转子', number: 33, x: 408, y: 162 },
//   { area: '生产二区圆铜线', line: 'MEB定子', number: 6, x: 302, y: 215 },
//   { area: '生产二区圆铜线', line: 'MEB电枢线', number: 37, x: 350, y: 246 },
//   { area: '生产二区扁铜线', line: '小电轴定子', number: 4, x: 457, y: 173 },
//   { area: '生产二区扁铜线', line: '小电轴电枢', number: 43, x: 477, y: 188 },
//   { area: '生产一区滴漆', line: '滴漆（MEB）', number: 0, x: 595, y: 84 },
//   { area: '生产一区滴漆', line: '滴漆（小电轴）', number: 12, x: 679, y: 109 },
//   { area: '生产一区', line: 'EDU电枢', number: 23, x: 486, y: 108 },
//   { area: '生产一区', line: 'EV2电枢', number: 29, x: 620, y: 122 },
//   { area: '生产一区滴漆', line: '滴漆（EV&EDU）', number: 8, x: 623, y: 85 },
//   { area: '生产一区', line: 'EDU总装', number: 46, x: 572, y: 152 },
//   { area: '生产一区', line: 'EV2总装', number: 41, x: 521, y: 87 },
//   { area: '生产三区', line: 'BEV3漆前电枢', number: 18, x: 497, y: 357 },
//   { area: '生产二区圆铜线', line: 'MEB转子二期', number: 19, x: 178, y: 243 },
//   { area: '生产三区', line: 'VOLVO总装线', number: 25, x: 864, y: 189 },
//   { area: '生产三区', line: 'VOLVO漆后定子线', number: 7, x: 753, y: 180 },
//   {
//     area: '生产一区滴漆',
//     line: '绝缘车间（VOLVO）',
//     number: 20,
//     x: 787,
//     y: 156,
//   },
//   {
//     area: '生产一区滴漆',
//     line: 'MEB及小电轴滴漆扩能产线',
//     number: 0,
//     x: 733,
//     y: 132,
//   },
//   { area: '生产二区扁铜线', line: 'C轴电枢线', number: 27, x: 436, y: 190 },
//   { area: '生产三区', line: 'BEV3漆后电枢', number: 6, x: 610, y: 430 },
//   {
//     area: '生产二区扁铜线',
//     line: '注塑转子二号线',
//     number: 29,
//     x: 409,
//     y: 374,
//   },
//   { area: '生产三区', line: 'VOLVO定子线', number: 15, x: 802, y: 194 },
// ];

@Component({
  selector: 'app-factory-map',
  templateUrl: './factory-map.component.html',
  styleUrls: ['./factory-map.component.less'],
  exportAs: 'factoryMap',
})
export class FactoryMapComponent implements AfterViewInit {
  width = 0;
  height = 0;

  isShow = false;

  @Input() areas = areas;
  @Input() current!: (typeof areas)[number];
  @Output() currentChange = new EventEmitter();

  private el: ElementRef<HTMLElement> = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.cdr.detectChanges();
  }

  onClick(item: (typeof areas)[number]) {
    this.current = item;
    this.isShow = true;
    this.currentChange.emit(this.current);
  }

  // move(ev: { x: number; y: number }, item: (typeof areas)[number]) {
  //   this.current = item;
  //   this.isShow = true;
  //   const tmp = area2.find((a) => a.line === item.line)!;
  //   tmp.x = ev.x;
  //   tmp.y = ev.y;
  // }

  // log() {
  //   console.log(area2);
  // }
}
