
import Factory from '../Factory'

// package bricks
import AffineCipherEncoder from '../Encoder/AffineCipher'
import HashViewer from '../Viewer/Hash'
import ROT13Encoder from '../Encoder/ROT13'
import TextTransformEncoder from '../Encoder/TextTransform'
import TextViewer from '../Viewer/Text'
import VigenereCipherEncoder from '../Encoder/VigenereCipher'
import Base64Encoder from '../Encoder/Base64'

// singleton instance
let instance = null

/**
 * Factory for Brick objects.
 */
export default class BrickFactory extends Factory {
  /**
   * Brick Factory constructor.
   */
  constructor () {
    super()

    // gather package brick classes
    let invokables = [
      TextViewer,
      TextTransformEncoder,
      AffineCipherEncoder,
      ROT13Encoder,
      VigenereCipherEncoder,
      Base64Encoder,
      HashViewer
    ]

    // register each brick
    invokables.forEach(this.register.bind(this))
  }

  /**
   * Registers brick invokable.
   * @param {class} invokable
   * @throws Throws an error if identifier already exists.
   * @return {BrickFactory} Fluent interface
   */
  register (invokable) {
    let identifier = invokable.getMeta().name
    return super.register(identifier, invokable)
  }

  /**
   * Returns brick meta for given identifier.
   * @throws Throws an error if identifier does not exist.
   * @param {string} identifier
   * @return {object} Brick meta
   */
  getMeta (identifier) {
    return this.getInvokable(identifier).getMeta()
  }

  /**
   * Get brick factory singleton instance.
   */
  static getInstance () {
    if (instance === null) {
      instance = new BrickFactory()
    }
    return instance
  }
}
