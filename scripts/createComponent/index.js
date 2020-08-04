/**
 * Used to create stubbed components within the library
 *
 * The script can be called via the package.json or directly from the root of the project
 *
 * @argument componentName - name your component with a camel case naming convention
 *                         - by default we'll build it to /components
 *                         - You can include sub directories as well (ex: inputs/newButton)
 */
const fs = require('fs')

// Extensions
const COMPONENT_EXAMPLE = { path: './scripts/createComponent/examples/component.react.tsx', extension: '.react.tsx' }
const TEST_EXAMPLE = { path: './scripts/createComponent/examples/component.test.tsx', extension: '.test.tsx' }

// Files
const INDEX_EXAMPLE = { path: './scripts/createComponent/examples/index.tsx', filename: 'index.tsx' }
const STYLE_EXAMPLE = { path: './scripts/createComponent/examples/styles.css', filename: 'style.css' }

const EXAMPLE_FILES = [COMPONENT_EXAMPLE, TEST_EXAMPLE, INDEX_EXAMPLE, STYLE_EXAMPLE]

const COMPONENT_DIR = './src/components/'

const args = process.argv.slice(2)
const componentPath = args[0]

if (!componentPath) throw new Error('Missing expected new component path as arg 1')

const filePath = componentPath.split('/')

const fileName = filePath.pop()
const className = fileName.charAt(0).toUpperCase() + fileName.slice(1)
const parentPath = filePath.length ? filePath.join('/') + '/' : ''
const fullPath = COMPONENT_DIR + parentPath + className + '/'

if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath,  { recursive: true })

EXAMPLE_FILES.forEach(example => {
    let exampleFileText

    // Spaces skips React.Component
    const upperReg = / Component/g
    const lowerReg = /component/g

    exampleFileText = fs.readFileSync(example.path, 'utf8')
    exampleFileText = exampleFileText.replace(upperReg, ` ${className}`)
    exampleFileText = exampleFileText.replace(lowerReg, fileName)

    if (!example.extension) fs.writeFileSync(fullPath + example.filename, exampleFileText);
    else fs.writeFileSync(fullPath + fileName + example.extension, exampleFileText);
})

console.log(`Created new stubbed component - ${fullPath}`)
