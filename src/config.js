//

export const config = {
  host: 'http://diglossa.org',
  port: '5984',
  version: 'https://github.com/mbykov/diglossa.js/releases/latest',
  defstate: 'library',
  batch_size: 1000,
  pageSize: 25,
  splitSizes: [100, 0],
  langs: ['eng', 'deu', 'rus'],
  ldname: 'local',
  deflang: 'eng',
  extpath: './diglossa.export.fts'
}
