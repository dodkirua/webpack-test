/**
 * test object to webpack
 */
export const SayObject = {
    firstname : 'Alphonse',
    lastname : 'Dansletas',

    /**
     * Say hello to the object
     */
    sayHello: function () {
        console.log(`Hello ${this.firstname} ${this.lastname}`);
    },

    /**
     * Say goodBye to the object
     */
    sayGoodBye: function () {
        console.log(`Goodbye ${this.lastname}`);
    }
}