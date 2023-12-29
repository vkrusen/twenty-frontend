import { EntityManager } from 'typeorm';

import { peopleDemo } from './people-demo';

export const personPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
) => {
  const companies = await entityManager?.query(
    `SELECT * FROM ${schemaName}.company`,
  );

  // Iterate through the array and add a UUID for each person
  const people = peopleDemo.map((person, index) => ({
    nameFirstName: person.firstName,
    nameLastName: person.lastName,
    email: person.email,
    linkedinLinkUrl: person.linkedinUrl,
    jobTitle: person.jobTitle,
    city: person.city,
    avatarUrl: person.avatarUrl,
    companyId: companies[Math.floor(index / 2)].id,
  }));

  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.person`, [
      'nameFirstName',
      'nameLastName',
      'email',
      'linkedinLinkUrl',
      'jobTitle',
      'city',
      'avatarUrl',
      'companyId',
    ])
    .orIgnore()
    .values(people)
    .returning('*')
    .execute();
};
