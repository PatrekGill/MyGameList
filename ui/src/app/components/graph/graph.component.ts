import { Component, OnInit } from '@angular/core';

interface GraphBar {
  quantity: number;
  label: string;
}

interface Scale {
  quantity: number;
  label?: string | undefined;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  scale: Scale[] = [];

  constructor() {
    this.scale = [
      {
        quantity: 0,
      },
      {
        quantity: 10000,
        label: '$10,000',
      },
      {
        quantity: 20000,
      },
      {
        quantity: 30000,
        label: '$30,000',
      },
      {
        quantity: 40000,
        label: '$40,000',
      },
      {
        quantity: 50000,
        label: '$50000',
      },
      {
        quantity: 60000,
        label: '$60,000',
      },
    ];

    this.scale.sort((a,b) => b.quantity - a.quantity);
  }

  ngOnInit(): void {}
}
