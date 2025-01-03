import errorObject from './errorObject'

import type { NextFunction, Request } from 'express'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode = 500): void => {
    const errorObj = errorObject(err, req, errorStatusCode)
    return void nextFunc(errorObj)
}
