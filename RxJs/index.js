(function() {
    const Observable = Rx.Observable;

    // map()
    let numbers = [3,9,7];
    let source = Rx.Observable.from(numbers)
    .map(value => {
        return 2 * value;
    })
    source.subscribe(value => {
        console.log(value);
    })

    // do()
    let source2 = Observable.create(observer => {
        observer.next('Tom')
        observer.next('Hary')
        observer.complete()
    });

    source2.do(value => console.log(value))
    .map(value => value.toUpperCase())
    .do(value => console.log(value))
    .subscribe(
        value => console.log(value),
        error => console.log(error),
        () => console.log("complete testing do")
    );

    names = ['Ram', 'Tom', 'Hary', 'Hem'];
    nameObservable = Observable.from(this.names);
    // filter()
    nameObservable
    .filter((name) => name.includes('H'))
    .subscribe((data) => console.log(data));
    // first() / last()
    nameObservable
    .last().map((name) => name.toUpperCase())
    .subscribe((data) => console.log(`Uppercased last name ${data}`));

    // retry()
    sourceRetry = Observable.create(observer => {
        observer.next('Ram')
        observer.next('Tom')
        observer.next('Hary')
        // throw 'exception'
    });
      
    this.sourceRetry.catch(err => console.log('error ocurred!' + err))
    .retry(2)
    .subscribe(data => console.log(data))

})();

