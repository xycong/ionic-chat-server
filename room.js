function Room(name, id, creator) {
    this.name = name;
    this.id = id;
    this.creator = creator;
    this.participants = [];
    this.status = "available";
    this.private = false;
};

Room.prototype.addPerson = function(personID) {
    if (this.status === 1) {
        this.people.push(personID);
    }
};

Room.prototype.removePerson = function(personID) {
    var personIndex = this.getPersonIndex(personID);
    this.participants.splice(personIndex, 1);
};

Room.prototype.getPersonIndex = function(personID) {
    var personIndex;
    for(var i = 0; i < this.participants.length - 1; i++) {
        if(this.participants[i].id === personID) {
            personIndex = this.participants[i];
        }
    }
    return personIndex;
}

Room.prototype.getPerson = function(personID) {
    var personIndex = this.getPersonIndex(personID);
    return this.participants[personIndex];
}

Room.prototype.isAvailable = function() {
    return this.available === "available";
}

Room.prototype.isPrivate = function() {
    return this.private;
}

module.exports = Room;