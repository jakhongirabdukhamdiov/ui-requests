import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import RequestLevelFilter from './RequestLevelFilter';
import {
  requestFilterTypes,
  requestLevelFilters,
} from '../../../constants';

Accordion.mockImplementation(({ onClearFilter, children }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid="accordion"
    onClick={onClearFilter}
  >
    {children}
  </div>
));

describe('RequestLevelFilter', () => {
  const labelIds = {
    requestLevel: 'ui-requests.requestLevel',
  };

  const testOnClearCallback = jest.fn();
  const testOnChangeCallback = () => {};
  const defaultTestActiveValues = [];
  const defaultTestProps = {
    activeValues: defaultTestActiveValues,
    onChange: testOnChangeCallback,
    onClear: testOnClearCallback,
  };

  afterEach(() => {
    Accordion.mockClear();
    FilterAccordionHeader.mockClear();
    CheckboxFilter.mockClear();
    testOnClearCallback.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <RequestLevelFilter {...defaultTestProps} />
      );
    });

    it('should render Accordion component', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        displayClearButton: false,
        id: requestFilterTypes.REQUEST_LEVELS,
        header: FilterAccordionHeader,
        label: labelIds.requestLevel,
        name: requestFilterTypes.REQUEST_LEVELS,
        separator: false,
      }), {});
    });

    it('should handle clear filters', () => {
      expect(testOnClearCallback).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('accordion'));

      expect(testOnClearCallback).toHaveBeenCalledWith(requestFilterTypes.REQUEST_LEVELS);
    });

    it('should render CheckboxFilter component', () => {
      expect(CheckboxFilter).toHaveBeenCalledWith(expect.objectContaining({
        dataOptions: [{
          label: requestLevelFilters[0].label,
          value: requestLevelFilters[0].value,
        }, {
          label: requestLevelFilters[1].label,
          value: requestLevelFilters[1].value,
        }],
        name: requestFilterTypes.REQUEST_LEVELS,
        selectedValues: defaultTestActiveValues,
        onChange: testOnChangeCallback,
      }), {});
    });
  });

  describe('when activeValues has items', () => {
    const testActiveValues = [
      requestLevelFilters[0].value,
    ];

    beforeEach(() => {
      render(
        <RequestLevelFilter
          {...defaultTestProps}
          activeValues={testActiveValues}
        />
      );
    });

    it('should render Accordion component', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        displayClearButton: true,
      }), {});
    });

    it('should render CheckboxFilter component', () => {
      expect(CheckboxFilter).toHaveBeenCalledWith(expect.objectContaining({
        selectedValues: testActiveValues,
      }), {});
    });
  });
});
