function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/members/skills-member.html',
    scope: {
      member: '=',
      skills: '='
    },
    controller: function($scope) {
      $scope.getSkillName = function(skillId) {
        var skillName = '';
        $scope.skills.forEach(function(skill) {
          if (skill.id == skillId) {
            skillName = skill.name;
          }
        });
        return skillName;
      }
    }
  }
}