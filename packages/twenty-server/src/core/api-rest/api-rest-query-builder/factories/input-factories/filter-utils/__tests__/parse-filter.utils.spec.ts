import { objectMetadataItem } from 'src/utils/utils-test/object-metadata-item';
import { parseFilter } from 'src/core/api-rest/api-rest-query-builder/factories/input-factories/filter-utils/parse-filter.utils';

describe('parseFilter', () => {
  it('should parse string filter test 1', () => {
    expect(
      parseFilter(
        'and(fieldNumber[eq]:1,fieldNumber[eq]:2)',
        objectMetadataItem,
      ),
    ).toEqual({
      and: [{ fieldNumber: { eq: 1 } }, { fieldNumber: { eq: 2 } }],
    });
  });

  it('should parse string filter test 2', () => {
    expect(
      parseFilter(
        'and(fieldNumber[eq]:1,or(fieldNumber[eq]:2,fieldNumber[eq]:3))',
        objectMetadataItem,
      ),
    ).toEqual({
      and: [
        { fieldNumber: { eq: 1 } },
        { or: [{ fieldNumber: { eq: 2 } }, { fieldNumber: { eq: 3 } }] },
      ],
    });
  });

  it('should parse string filter test 3', () => {
    expect(
      parseFilter(
        'and(fieldNumber[eq]:1,or(fieldNumber[eq]:2,fieldNumber[eq]:3,and(fieldNumber[eq]:6,fieldNumber[eq]:7)),or(fieldNumber[eq]:4,fieldNumber[eq]:5))',
        objectMetadataItem,
      ),
    ).toEqual({
      and: [
        { fieldNumber: { eq: 1 } },
        {
          or: [
            { fieldNumber: { eq: 2 } },
            { fieldNumber: { eq: 3 } },
            { and: [{ fieldNumber: { eq: 6 } }, { fieldNumber: { eq: 7 } }] },
          ],
        },
        { or: [{ fieldNumber: { eq: 4 } }, { fieldNumber: { eq: 5 } }] },
      ],
    });
  });

  it('should parse string filter test 4', () => {
    expect(
      parseFilter(
        'and(fieldString[gt]:"val,ue",or(fieldNumber[is]:NOT_NULL,not(fieldString[startsWith]:"val"),and(fieldNumber[eq]:6,fieldString[ilike]:"%val%")),or(fieldNumber[eq]:4,fieldString[is]:NULL))',
        objectMetadataItem,
      ),
    ).toEqual({
      and: [
        { fieldString: { gt: 'val,ue' } },
        {
          or: [
            { fieldNumber: { is: 'NOT_NULL' } },
            { not: { fieldString: { startsWith: 'val' } } },
            {
              and: [
                { fieldNumber: { eq: 6 } },
                { fieldString: { ilike: '%val%' } },
              ],
            },
          ],
        },
        { or: [{ fieldNumber: { eq: 4 } }, { fieldString: { is: 'NULL' } }] },
      ],
    });
  });

  it('should handler not', () => {
    expect(
      parseFilter(
        'and(fieldNumber[eq]:1,not(fieldNumber[eq]:2))',
        objectMetadataItem,
      ),
    ).toEqual({
      and: [
        { fieldNumber: { eq: 1 } },
        {
          not: { fieldNumber: { eq: 2 } },
        },
      ],
    });
  });
});
