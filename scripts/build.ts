import { exec } from 'child_process'
import { argv } from 'yargs'
import { improveTypescriptCompatibility } from './improve-typescript-compatibility'
import { makeDebug } from './utils'

const QUIET: boolean = !!argv.quiet || !!argv.q
const { debug, startDebugContext, endDebugContext } = makeDebug(() => !QUIET)

const INCLUDE_ASSETS: boolean = !!argv.assets
const INCLUDE_TESTS: boolean = !!argv.tests

const execAsync = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        if (stdout) (err as any).logs = stdout
        reject(err)
      } else resolve(stdout)
    })
  })

const build = async (): Promise<void> => {
  debug('Cleaning the last build')
  await execAsync('npx rimraf "dist-tsc" "dist"')

  debug('Transpiling TypeScript files')
  const tsconfig = '.config/tsconfig.' + (INCLUDE_TESTS ? 'spec' : 'build') + '.json'
  await execAsync(`npx tsc -p ${tsconfig} && tsc-alias -p ${tsconfig}`)

  debug('Copying files to dist')
  await execAsync('npx copyfiles --up=1 "dist-tsc/**/*" dist')
  if (INCLUDE_ASSETS) await execAsync('npx copyfiles --up=1 "src/**/!(*.ts)" dist')

  debug('Cleaning the TypeScript builds')
  await execAsync('npx rimraf "dist-tsc"')
}

;(async () => {
  startDebugContext('Build', ['red', 'bold'])
  debug(`Will build`)

  try {
    await build()

    debug(`Improving typescript compatibility`)
    await improveTypescriptCompatibility('dist')
  } catch (err) {
    startDebugContext('Error', ['red', 'bold'])
    if (err.message) debug(err.message)
    if (err.logs) console.log(err.logs)
    endDebugContext()

    process.exit(1)
  }
})()
