import { Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tree, TreeModule } from 'primeng/tree';
import { TreeNode, TreeDragDropService } from 'primeng/api';
import { NodeService } from 'src/app/services/node.service';
import { DropdownModule } from 'primeng/dropdown';
import { SharedUiBlocksModule } from 'src/app/shared/ui-blocks.module';
import { isPlatformBrowser } from '@angular/common';
import { SharedDataService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [SharedUiBlocksModule, TreeModule, FormsModule, DropdownModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeDragDropService]
})
export class TreeComponent implements OnInit {
  private _nodeService = inject(NodeService);

  nodes!: TreeNode[];
  filteredNodes: TreeNode[] = [];
  selectedNode!: string;
  isMobile: boolean = false;
  types!: string[];

  @ViewChild('tree') tree!: Tree;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private sharedDataervice: SharedDataService ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIsMobile();
    }
  }

  ngOnInit() {
    this.sharedDataervice.setPageTitle('Search Geo Objects')
    if (isPlatformBrowser(this.platformId)) {
      this.checkIsMobile();
    }

    this._nodeService.getNodes().subscribe((grouped: { nodes: TreeNode[], types: string[] }) => {
      this.nodes = grouped.nodes;
      this.types = grouped.types;
      this.filteredNodes = [...this.nodes]; // Initialize filteredNodes with a copy of nodes
    });
  }

  checkIsMobile() {
    this.isMobile = window.innerWidth <= 767;
  }

  searchParent() {
    if (this.tree) {
      this.tree.resetFilter();
      this.filteredNodes = !this.selectedNode ? this.nodes : this._nodeService.findNodesByTypeName(this.nodes, this.selectedNode);
    }
  }

  reset() {
    this.filteredNodes = this.nodes;
  }
  
}
