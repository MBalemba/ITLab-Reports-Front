import { GetterTree } from 'vuex';
import { RootState } from '@/store';

import { ILayoutState, LAYOUT_PAGES_GET } from './types';
import { RouteConfig } from 'vue-router';

export const getters: GetterTree<ILayoutState, RootState> = {
  [LAYOUT_PAGES_GET]: (state) => {
    let result: RouteConfig[] = [];
    state.groups.forEach((group) => {
      group.sections.forEach((section) => {
        section.pages.map((page) => {
          if (page.meta === undefined) {
            page.meta = {};
          }
          page.meta.parentSection = section.name;
          page.meta.isAnotherFrontEnd = section.anotherFrontEnd;
        });
        result = result.concat(section.pages);
      });
    });

    return result.concat([
      {
        path: '*'
      }
    ]);
  }
};
