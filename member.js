function skillsMember() {
    return {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
}