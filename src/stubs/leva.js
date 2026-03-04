const isPlainObject = (value) =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const hasValueField = (value) => isPlainObject(value) && 'value' in value

const extractValues = (schema, output) => {
  if (!isPlainObject(schema)) return output

  for (const [key, value] of Object.entries(schema)) {
    if (hasValueField(value)) {
      output[key] = value.value
      continue
    }

    if (isPlainObject(value)) {
      extractValues(value, output)
    }
  }

  return output
}

export const folder = (schema = {}, _settings = {}) => schema

export const button = (handler) => ({ value: undefined, onClick: handler })

export const useControls = (...args) => {
  let schema = args[0]

  if (typeof schema === 'string') {
    schema = args[1] ?? {}
  } else if (typeof schema === 'function') {
    schema = schema()
  }

  return extractValues(schema, {})
}

export const Leva = () => null
export const LevaPanel = () => null
export const useCreateStore = () => ({})
